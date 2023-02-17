import {createClient, RedisClientType} from "redis";

const redis_url: string = process.env.REDIS_URL || `redis://localhost:6379`;

const Client: RedisClientType = createClient({
    url: redis_url
});

Client.on('error', err => console.log('Redis Client Error', err));
Client.on('connect', () => console.log('Redis Client connect'));

export const RedisClient = Client;







