import { Injectable, signal } from '@angular/core';
import type { DateRange } from '../models';

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

@Injectable({ providedIn: 'root' })
export class DashboardRangeService {
  readonly range = signal<DateRange>({ desde: daysAgo(30), hasta: daysAgo(0) });

  setRange(range: DateRange) {
    this.range.set(range);
  }
}
