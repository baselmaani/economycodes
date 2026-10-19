/** Return shape of every dashboard server action, so editors can show errors inline. */
export type ActionResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? { data?: undefined } : { data: T }))
  | { ok: false; errors: string[] };
