import { Component, inject, signal, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { PaymentService } from '../../core/services/payment.service';
import { OrderService } from '../../core/services/order.service';
import type { PaymentResponse, OrderResponse } from '../../core/models';
import { timer, Subscription, switchMap, takeWhile } from 'rxjs';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, DatePipe],
  template: `
    <div class="mx-auto w-full max-w-[1600px] px-6 py-8">
      <h1 class="text-3xl text-jackson-charcoal font-medium">Pago exitoso</h1>

      @if (loading()) {
        <div class="flex justify-center py-20">
          <app-spinner size="32" text="Verificando pago..." />
        </div>
      } @else if (error(); as err) {
        <div class="py-20 text-center space-y-4">
          <p class="text-jackson-charcoal/40 font-normal">{{ err }}</p>
          <a
            routerLink="/orders"
            class="inline-block text-jackson-navy hover:text-jackson-navy-hover underline font-medium"
          >
            Ver mis órdenes
          </a>
        </div>
      } @else if (payment(); as p) {
        <div class="py-20 text-center space-y-4">
          <p class="text-xl text-jackson-charcoal font-medium">
            {{ order()?.status === 'PAID' ? '¡Pago confirmado!' : 'Procesando pago...' }}
          </p>
          @if (payment(); as p) {
            <div class="mx-auto max-w-md space-y-2 rounded-lg bg-gray-100 p-6 text-left">
              <p class="text-jackson-charcoal font-medium">
                <span class="text-jackson-charcoal/50">Monto:</span> S/ {{ p.amount }}
              </p>
              <p class="text-jackson-charcoal font-medium">
                <span class="text-jackson-charcoal/50">Método:</span> {{ p.paymentMethod }}
              </p>
              <p class="text-jackson-charcoal font-medium">
                <span class="text-jackson-charcoal/50">Estado:</span>
                <span [class]="order()?.status === 'PAID' ? 'text-green-600' : 'text-yellow-600'">
                  {{ order()?.status === 'PAID' ? 'Exitoso' : 'Pendiente' }}
                </span>
              </p>
              <p class="text-jackson-charcoal font-medium">
                <span class="text-jackson-charcoal/50">Transacción:</span> {{ p.transactionId }}
              </p>
              <p class="text-jackson-charcoal font-medium">
                <span class="text-jackson-charcoal/50">Fecha:</span>
                {{ p.paidAt | date: 'dd/MM/yyyy HH:mm' }}
              </p>
            </div>
          }
          <a
            routerLink="/orders"
            class="inline-block text-jackson-navy hover:text-jackson-navy-hover underline font-medium"
          >
            Ver detalle de la orden
          </a>
        </div>
      }
    </div>
  `,
})
export class CheckoutSuccessComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly paymentService = inject(PaymentService);
  private readonly orderService = inject(OrderService);
  private sub: Subscription | null = null;

  readonly payment = signal<PaymentResponse | null>(null);
  readonly order = signal<OrderResponse | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (!orderId) {
      this.error.set('No se encontró la orden');
      this.loading.set(false);
      return;
    }

    // Polling for order status and payment
    this.sub = timer(0, 3000)
      .pipe(
        switchMap(() => this.orderService.getById(orderId)),
        takeWhile((order) => order.status === 'PENDING', true),
      )
      .subscribe({
        next: (order) => {
          this.order.set(order);
          if (order.status !== 'PENDING') {
            this.loading.set(false);
            this.paymentService.getByOrder(orderId).subscribe({
              next: (payments) => {
                this.payment.set(payments[0] ?? null);
              },
            });
          }
        },
        error: () => {
          this.error.set('No se pudo verificar el estado de la orden');
          this.loading.set(false);
        },
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
