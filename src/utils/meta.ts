export enum Meta {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export const isMeta = {
  initial: (meta: Meta): boolean => meta === Meta.initial,
  loading: (meta: Meta): boolean => meta === Meta.loading,
  success: (meta: Meta): boolean => meta === Meta.success,
  error: (meta: Meta): boolean => meta === Meta.error,
}
