import { redis } from './client';

/**
 * REAL-TIME HEADCOUNT MANAGEMENT
 * Used by door staff to track venue density.
 * * @param eventId - Unique ID for the specific club night.
 * @param increment - true for 'Entry', false for 'Exit'.
 */
export const updateCapacity = async (eventId: string, increment: boolean) => {
  const key = `capacity:event:${eventId}`;
  if (increment) {
    // Atomic increment ensures accuracy during busy door surges
    return await redis.incr(key);
  }
  return await redis.decr(key);
};

/**
 * GET LIVE CAPACITY
 * Fetches the current count from the Redis cache for the admin dashboard.
 */
export const getCapacity = async (eventId: string) => {
  const count = await redis.get<number>(`capacity:event:${eventId}`);
  return count || 0;
};