import AppStore from "../store";

export const capInvoke = async (fn: () => any, err?: (error: Error) => void) => {
  try {
    const result = await fn();
    AppStore.update(s => {
      s.result = result;
      s.error = null;
    });
    return result;
  } catch (e) {
    console.error(e);
    err?.(e);
    AppStore.update(s => {
      s.result = null;
      s.error = e;
    });
    // throw e;
  }
}
