/**
 * lib/exhibitionStatus.js
 *
 * Returns the "effective" status of an exhibition.
 * If status is "open" but createdAt is older than EXPIRY_DAYS,
 * we treat it as "expired" — without touching the database.
 */

const EXPIRY_DAYS = 7;
const EXPIRY_MS   = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

/**
 * @param {{ status: string, createdAt: string | Date }} exhibition
 * @returns {string} effective status
 */
export function getEffectiveStatus(exhibition) {
  if (exhibition.status !== "open") return exhibition.status;

  const created   = new Date(exhibition.createdAt).getTime();
  const isExpired = Date.now() - created > EXPIRY_MS;

  return isExpired ? "expired" : "open";
}

/**
 * Applies getEffectiveStatus to every item in an array
 * and returns new objects (does not mutate originals).
 *
 * @param {Array} exhibitions
 * @returns {Array}
 */
export function applyEffectiveStatus(exhibitions) {
  return exhibitions.map((ex) => ({
    ...ex,
    status: getEffectiveStatus(ex),
  }));
}