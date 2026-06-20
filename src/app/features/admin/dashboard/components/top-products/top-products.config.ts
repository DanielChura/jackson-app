import { Chart, registerables } from 'chart.js';
import type { TopProductEntry } from '../../../../../core/models';

Chart.register(...registerables);

function truncateLabel(label: string, max = 12): string {
  return label.length > max ? label.substring(0, max - 1) + '…' : label;
}

export function renderTopProductsChart(canvas: HTMLCanvasElement, data: TopProductEntry[]): Chart {
  const prev = Chart.getChart(canvas);
  prev?.destroy();

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No canvas context');

  const sorted = [...data].reverse();
  const labels = sorted.map((p) => p.productName);
  const values = sorted.map((p) => p.revenue);

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Ingresos (S/)',
          data: values,
          backgroundColor: '#f97316',
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
          callbacks: {
            title: (items) => labels[items[0].dataIndex],
            label: (ctx) => `S/ ${Number(ctx.raw).toLocaleString('es-PE')}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#6b7280',
            font: { size: 11 },
            callback: (_value: unknown, index: number) => truncateLabel(labels[index]),
          },
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
