export const wrap =
  (instance: any) =>
  (fn: Function) =>
  (req: any, res: any, next: any) =>
    Promise.resolve(fn.call(instance, req, res, next)).catch(next);