const ratelimit = require("../config/upstash");

const rateLimiter = async (_, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({ message: "Too many requests, wait for cooldown..." });
        }
        next()
    } catch (error) {
        console.error("Error in ratelimiter: ", error);
        next(error);
    }
};

module.exports = rateLimiter;