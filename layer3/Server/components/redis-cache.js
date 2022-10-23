var redis = require("redis");
let redisClient;
const connectRedis = async () => {
  const config = {
    socket: { host: "127.0.0.1", port: 6379 },
    password:
      "Ww3mhaxhjsDL1Aes7nJc8mo/aThEkJZJkVVw+dTQ4Pio/K5chjZrkeF22EzqKhgM5XTNxxtZApqMqmrL",
  };

  redisClient = redis.createClient(config);
  redisClient
    .connect()

    .catch((err) => {
      console.log(err);
    });
  redisClient.on("connect", () => {
    console.log("Connected");
  });
};

function GetRedis(redisKey) {
  const data = redisClient
    .get(redisKey)
    .then((result) => {
      if (result) {
        const data = JSON.parse(result);
        console.log(data);
        return { source: "Redis Cache", ...data };
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log("err on redis get()", err);
      return null;
    });
  return data;
}

const SetRedis = async (redisKey, ttl, data) => {
  redisClient.setEx(redisKey, ttl, data).catch((err) => console.log(err));
};

module.exports = { connectRedis, GetRedis, SetRedis };
