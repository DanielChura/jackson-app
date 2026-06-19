import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    @if (toast.current(); as t) {
      <div class="fixed bottom-6 right-6 z-50 animate-slide-in">
        <div
          class="flex items-center gap-3 rounded-lg px-5 py-3 text-sm text-white"
          [class]="t.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
          style="font-weight:500"
        >
          @if (t.type === 'success') {
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          }
          {{ t.message }}
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes slide-in {
      from { opacity: 0; transform: translateY(0.5rem); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-in { animation: slide-in 0.2s ease-out; }
  `],
})
export class ToastComponent {
  protected readonly toast = inject(ToastService);
}
