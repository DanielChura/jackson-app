import { Chart, registerables } from 'chart.js';
import { DASHBOARD_ORDER_STATUS_MAP, type OrdersByStatusEntry } from '../../../../../core/models';

Chart.register(...registerables);

const CHART_COLORS: Record<string, string> = {
  PENDING: '#F59E0B',
  PAID: '#3B82F6',
  SHIPPED: '#8B5CF6',
  DELIVERED: '#10B981',
  CANCELLED: '#EF4444',
};

export function colorFor(status: string): string {
  return CHART_COLORS[status] || '#9ca3af';
}

export function labelFor(status: string): string {
  return (
    DASHBOARD_ORDER_STATUS_MAP[status as keyof typeof DASHBOARD_ORDER_STATUS_MAP]?.label || status
  );
}

export function renderOrdersByStatusChart(
  canvas: HTMLCanvasElement,
  data: OrdersByStatusEntry[],
): Chart {
  const prev = Chart.getChart(canvas);
  prev?.destroy();

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No canvas context');

  const colors = data.map((e) => colorFor(e.status));
  const labels = data.map((e) => labelFor(e.status));

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: data.map((e) => e.count),
          backgroundColor: colors,
          borderColor: '#fff',
          borderWidth: 2,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      radius: '65%',
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#111827',
          bodyColor: '#6b7280',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.raw} órdenes`,
          },
        },
      },
    },
  });
}
