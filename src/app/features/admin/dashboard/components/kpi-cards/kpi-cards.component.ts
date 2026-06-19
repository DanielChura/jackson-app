import { Component, inject, input, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, map, catchError, startWith } from 'rxjs';
import type { Observable } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { IconComponent } from '../../../../../shared/icons/icon.component';
import type { DashboardSummary, DateRange, LoadState } from '../../dashboard.types';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [DecimalPipe, SpinnerComponent, IconComponent],
  templateUrl: './kpi-cards.component.html',
  host: { class: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-5' },
})
export class KpiCardsComponent {
  private readonly service = inject(DashboardService);

  readonly range = input<DateRange>({ desde: '', hasta: '' });

  private state$ = toObservable(this.range).pipe(
    switchMap(() =>
      this.service.getSummary(this.range()).pipe(
        map((data): LoadState<DashboardSummary> => ({ loading: false, data, error: null })),
        catchError(
          (): Observable<LoadState<DashboardSummary>> =>
            of({ loading: false, data: null, error: 'Error al cargar el resumen' }),
        ),
        startWith<LoadState<DashboardSummary>>({ loading: true, data: null, error: null }),
      ),
    ),
  );
  private readonly state = toSignal(this.state$, { initialValue: { loading: true, data: null, error: null } as LoadState<DashboardSummary> });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  formatCurrency(value: number): string {
    return `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
