const redis = require('../config/redis.config');

exports.invalidateCollectionCache = async (modelName) => {
  let cursor = '0';
  const pattern = `${modelName}`;
  try {
    do {
      const reply = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);

      cursor = reply[0];
      const keys = reply[1];
      if (keys.length > 0) {
        await redis.del(...keys);
        console.log(
          `[Cache Invalidation] Successfully removed ${keys.length} keys for pattern: ${pattern}`,
        );
      }
    } while (cursor !== '0');
  } catch (error) {
    console.error(
      `[Cache Invalidation Error] Failed to clear pattern ${pattern}:`,
      err,
    );
  }
};
