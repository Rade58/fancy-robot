import Redis from "ioredis";

// WE HAVE SAME ENV VARIABLE FOR PRODUCTION OR DEVELOPMENT (SINCE WE ARE USING 2 ENV FILES)
const client = new Redis(process.env.REDIS_URI);

// SOMWHERE (WHEN USING WITH BullMQ) WE ARE GOING
// TO EFER TO THIS AS A connection
export default client;
