import { Chart, registerables } from 'chart.js';
import type { SalesByPeriodEntry } from '../../../../../core/models';

Chart.register(...registerables);

function formatPeriodLabel(d: SalesByPeriodEntry): string {
  if (d.period.includes('W')) return d.period.replace('2026-W', 'W');
  if (d.period.length === 7) return d.period;
  const parts = d.period.split('-');
  return `${parts[2]}/${parts[1]}`;
}

export function renderSalesChart(canvas: HTMLCanvasElement, data: SalesByPeriodEntry[]): Chart {
  const prev = Chart.getChart(canvas);
  prev?.destroy();

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No canvas context');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(formatPeriodLabel),
      datasets: [
        {
          label: 'Ventas (S/)',
          data: data.map((d) => d.totalSales),
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.08)',
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: '#f97316',
          yAxisID: 'y',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#111827',
          bodyColor: '#6b7280',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#9ca3af', font: { size: 11 } },
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: {
            color: '#9ca3af',
            font: { size: 11 },
            callback: (v) => `S/${Number(v).toLocaleString('es-PE')}`,
          },
        },
      },
    },
  });
}
