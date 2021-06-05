export const capInvoke = async (fn: () => any, err?: (error: Error) => void) => {
  try {
    return await fn();
  } catch (e) {
    err?.(e);
  }
}
