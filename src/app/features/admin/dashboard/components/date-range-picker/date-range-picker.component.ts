import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardRangeService } from '../../../../../core/services/dashboard-range.service';
import type { DateRange } from '../../../../../core/models';

type PresetId = 'today' | '7d' | '30d' | 'month' | 'custom';

interface Preset {
  id: PresetId;
  label: string;
}

const PRESETS: Preset[] = [
  { id: 'today', label: 'Hoy' },
  { id: '7d', label: '7 días' },
  { id: '30d', label: '30 días' },
  { id: 'month', label: 'Este mes' },
  { id: 'custom', label: 'Personalizado' },
];

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function computeRange(preset: PresetId): DateRange {
  const hoy = new Date();
  const today = formatDate(hoy);
  switch (preset) {
    case 'today':
      return { desde: today, hasta: today };
    case '7d': {
      const from = new Date(hoy);
      from.setDate(from.getDate() - 7);
      return { desde: formatDate(from), hasta: today };
    }
    case '30d': {
      const from = new Date(hoy);
      from.setDate(from.getDate() - 30);
      return { desde: formatDate(from), hasta: today };
    }
    case 'month':
      return { desde: `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-01`, hasta: today };
    default:
      return { desde: '', hasta: '' };
  }
}

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-range-picker.component.html',
})
export class DateRangePickerComponent {
  private readonly rangeService = inject(DashboardRangeService);

  readonly presets = PRESETS;
  readonly activePreset = signal<PresetId>('30d');
  readonly customDesde = signal('');
  readonly customHasta = signal('');

  selectPreset(id: PresetId) {
    this.activePreset.set(id);
    if (id === 'custom') {
      this.customDesde.set(this.rangeService.range().desde || '');
      this.customHasta.set(this.rangeService.range().hasta || '');
      return;
    }
    this.rangeService.setRange(computeRange(id));
  }

  onCustomDesdeChange(val: string) {
    this.customDesde.set(val);
    this.emitCustom();
  }

  onCustomHastaChange(val: string) {
    this.customHasta.set(val);
    this.emitCustom();
  }

  btnClass(id: PresetId): string {
    const active = this.activePreset() === id;
    const base = 'rounded-lg border px-3 py-1.5 text-sm transition-colors';
    return active
      ? `${base} border-orange-500 bg-orange-50 text-orange-600`
      : `${base} border-gray-200 text-gray-600 hover:border-gray-300`;
  }

  private emitCustom() {
    if (this.customDesde() && this.customHasta()) {
      this.rangeService.setRange({ desde: this.customDesde(), hasta: this.customHasta() });
    }
  }
}
