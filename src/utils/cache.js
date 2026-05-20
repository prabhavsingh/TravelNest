// const mongoose = require('mongoose');
// const exec = mongoose.Query.prototype.exec;
// mongoose.Query.prototype.cache = function (options = {}) {
//   this.useCache = true;
//   this.hashKey == JSON.stringify(options.key || '');
//   return this;
// };
// mongoose.Query.prototype.exec = async function (...args) {
//   console.log('I am about to run a query');
//   //   console.log(new Error().stack);
//   //   console.log(this.getQuery());
//   console.log(this.mongooseCollection.name);

//   if (!this.useCache) {
//     return exec.apply(this, arguments);
//   }

//   const key = Object.assign({}, this.getQuery(), {
//     collection: this.mongooseCollection.name,
//   });
//   console.log('key', key);
//   const cacheKey = JSON.stringify(key);

//   // see if we have a value 'key' in redis
//   const cachedValue = await redis.hget(this.hashKey, cacheKey);

//   //if we do , return that
//   if (cachedValue) {
//     console.log('CACHE HIT', JSON.parse(cachedValue));

//     const doc = new this.model(JSON.parse(cachedValue));
//     return doc;
//   }
//   console.log('CACHE MISS');

//   //otherwise , issue the query and store the result in redis
//   const result = await exec.apply(this, args);
//   // console.log('result',result)

//   await redis.hset(this.hashKey, cacheKey, JSON.stringify(result), 'EX', 10);
//   return result;
// };
// exports.clearHash = async function (hashKey) {
//   await redis.del(JSON.stringify(hashKey));
// };

const { redis } = require('../config/redis.config');

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
