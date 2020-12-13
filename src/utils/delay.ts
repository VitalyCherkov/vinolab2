export const delay = async (duration: number = 1000): Promise<void> =>
  new Promise(r => setTimeout(r, duration));

export const withDelay = async <T>(func: () => Promise<T>): Promise<T> => {
  await delay();
  return await func();
}
