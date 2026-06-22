import { Component, inject, signal } from '@angular/core';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { UserService } from '../../../../core/services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { UserResponse } from '../../../../core/models';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [SpinnerComponent, PaginatorComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  private readonly userService = inject(UserService);
  private readonly toast = inject(ToastService);

  readonly users = signal<UserResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.userService.getAll(this.page(), 20).subscribe({
      next: (res) => {
        this.users.set(res.content);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('No se pudieron cargar los usuarios', 'error');
      },
    });
  }

  delete(id: string) {
    if (!confirm('¿Eliminar este usuario?')) return;
    this.userService.delete(id).subscribe({
      next: () => {
        this.toast.show('Usuario eliminado');
        this.load();
      },
      error: () => this.toast.show('No se pudo eliminar el usuario', 'error'),
    });
  }

  prev() {
    if (this.page() > 0) {
      this.page.update((p) => p - 1);
      this.load();
    }
  }

  next() {
    if (this.page() < this.totalPages() - 1) {
      this.page.update((p) => p + 1);
      this.load();
    }
  }
}
