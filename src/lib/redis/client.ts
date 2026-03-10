import { Redis } from '@upstash/redis';

/**
 * UPSTASH REDIS (HTTP)
 * Used for serverless-friendly, low-latency operations:
 * 1. Door capacity tracking (real-time).
 * 2. Rate limiting (preventing bot attacks on the Tribe signup).
 * 3. Payment session persistence.
 */
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});