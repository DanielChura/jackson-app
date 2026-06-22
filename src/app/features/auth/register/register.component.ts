import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../../../shared/icons/icon.component';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, IconComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly loading = signal(false);

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.auth.register(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.auth.saveSession(res);
        this.router.navigate([res.role.toUpperCase() === 'ADMIN' ? '/admin' : '/']);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show(
          'No se pudo completar el registro. Revisá los datos e intentá de nuevo.',
          'error',
        );
      },
    });
  }
}
