import Redis from 'ioredis';

type ChannelName = string;

type SubscriberRedis = Map<ChannelName, Redis>;

const globalForRedis = globalThis as unknown as {
  redis?: Redis;
  subscriberRedis?: SubscriberRedis;
};

/**
 * Redis 설정 옵션
 */
const redisOptions = {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  connectTimeout: 10000,
  commandTimeout: 5000,
};

/**
 * Redis 클라이언트 생성
 */
function createRedisClient(tag?: string) {
  const client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', redisOptions);
  client.on('error', (error) => {
    console.error(`[REDIS] ${tag} 연결 에러:`, error);
  });
  client.on('connect', () => {
    console.log(`[REDIS] ${tag} 연결 성공`);
  });
  return client;
}

/**
 * Redis 싱글톤 인스턴스 (일반 명령어 + Publish용)
 * 환경변수를 통해 설정 가능
 */
export const getRedisClient = (): Redis => {
  if (globalForRedis.redis) {
    return globalForRedis.redis;
  }

  globalForRedis.redis = createRedisClient();
  return globalForRedis.redis;
};

/**
 * 구독 전용 Redis 클라이언트 생성
 */
export const getSubscriberRedisClient = (channelName: ChannelName): Redis => {
  if (!globalForRedis.subscriberRedis) {
    globalForRedis.subscriberRedis = new Map();
    const redisClient = createRedisClient('Subscriber');
    globalForRedis.subscriberRedis.set(channelName, redisClient);
    return redisClient;
  }

  const redisClient = globalForRedis.subscriberRedis.get(channelName);
  if (!redisClient) {
    const redisClient = createRedisClient('Subscriber');
    globalForRedis.subscriberRedis.set(channelName, redisClient);
    return redisClient;
  }

  return redisClient;
};

/**
 * Redis 연결 종료
 */
export const closeRedisConnection = async (): Promise<void> => {
  if (globalForRedis.redis) {
    await globalForRedis.redis.quit();
    globalForRedis.redis = undefined;
  }

  if (globalForRedis.subscriberRedis) {
    for (const redis of Object.values(globalForRedis.subscriberRedis)) {
      await redis.quit();
    }
    globalForRedis.subscriberRedis = undefined;
  }
};
