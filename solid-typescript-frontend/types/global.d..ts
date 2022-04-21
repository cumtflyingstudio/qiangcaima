export {};

declare global {
  const __MODE__: 'none' | 'development' | 'production';
}

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any];
    }
  }
}
