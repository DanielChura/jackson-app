export interface IconDef {
  viewBox: string;
  paths: string[];
}

export const icons: Record<string, IconDef> = {
  sparkle: {
    viewBox: '0 0 24 24',
    paths: [
      'M21 12c-6.597 0 -9 2.403 -9 9c0 -6.597 -2.403 -9 -9 -9c6.597 0 9 -2.403 9 -9c0 6.597 2.403 9 9 9',
    ],
  },
  google: {
    viewBox: '0 0 24 24',
    paths: [
      'M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945',
    ],
  },
  'layout-dashboard': {
    viewBox: '0 0 24 24',
    paths: ['M4 4h7v9H4zM4 17h7v3H4zM13 4h7v7h-7zM13 15h7v5h-7z'],
  },
  package: {
    viewBox: '0 0 24 24',
    paths: ['M12 3L3 8v8l9 5 9-5V8l-9-5zM3 8l9 5 9-5M12 22V13'],
  },
  'shopping-cart': {
    viewBox: '0 0 24 24',
    paths: [
      'M6 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM17 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM17 17H6V3H4M6 5l14 1-1 7H6',
    ],
  },
  users: {
    viewBox: '0 0 24 24',
    paths: [
      'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    ],
  },
  'clipboard-list': {
    viewBox: '0 0 24 24',
    paths: [
      'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M8 10h8M8 14h8M8 18h5M12 4a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2z',
    ],
  },
  tag: {
    viewBox: '0 0 24 24',
    paths: [
      'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01',
    ],
  },
  grid: {
    viewBox: '0 0 24 24',
    paths: ['M4 4h5v5H4zM4 15h5v5H4zM15 4h5v5h-5zM15 15h5v5h-5z'],
  },
  'trending-up': {
    viewBox: '0 0 24 24',
    paths: ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'],
  },
  'dollar-sign': {
    viewBox: '0 0 24 24',
    paths: ['M12 1v22', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  },
  'alert-triangle': {
    viewBox: '0 0 24 24',
    paths: [
      'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
      'M12 9v4',
      'M12 17h.01',
    ],
  },
  clock: {
    viewBox: '0 0 24 24',
    paths: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2'],
  },
  heart: {
    viewBox: '0 0 24 24',
    paths: [
      'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    ],
  },
  search: {
    viewBox: '0 0 24 24',
    paths: ['M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'],
  },
  menu: {
    viewBox: '0 0 24 24',
    paths: ['M4 6h16M4 12h16M4 18h16'],
  },
  user: {
    viewBox: '0 0 24 24',
    paths: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  },
  'chevron-down': {
    viewBox: '0 0 24 24',
    paths: ['M6 9l6 6 6-6'],
  },
};

export type IconName = keyof typeof icons;
