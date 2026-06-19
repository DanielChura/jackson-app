import { Component, input } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  templateUrl: './step-indicator.component.html',
})
export class StepIndicatorComponent {
  readonly currentStep = input.required<number>();

  readonly steps = [
    { number: 1, label: 'Datos básicos' },
    { number: 2, label: 'Imágenes' },
    { number: 3, label: 'Especificaciones' },
  ];
}
