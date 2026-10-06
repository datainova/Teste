// "Friday mode": the site changes its mood on Fridays (São Paulo time).
// Brazil has had no DST since 2019, so a fixed UTC-3 offset is accurate.

const SP_OFFSET_MS = -3 * 60 * 60 * 1000;

function spNow(now = new Date()): Date {
  return new Date(now.getTime() + SP_OFFSET_MS);
}

export function isFriday(now = new Date()): boolean {
  return spNow(now).getUTCDay() === 5;
}

/** Milliseconds until the next Friday 18:00 in São Paulo (0 if it is Friday after 18h). */
export function msUntilFriday(now = new Date()): number {
  const sp = spNow(now);
  const target = new Date(sp);
  const daysAhead = (5 - sp.getUTCDay() + 7) % 7;
  target.setUTCDate(sp.getUTCDate() + daysAhead);
  target.setUTCHours(18, 0, 0, 0);
  if (target.getTime() <= sp.getTime()) {
    if (daysAhead === 0) return 0;
    target.setUTCDate(target.getUTCDate() + 7);
  }
  return target.getTime() - sp.getTime();
}
