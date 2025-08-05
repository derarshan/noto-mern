const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node')

const clerkMiddleware = ClerkExpressWithAuth();

const requireAuth = (req, res, next) => {
    const { auth } = req;
    if(!auth || !auth.userId) {
        return res.status(401).json({ error: "Unauthorized"});
    }
    req.userId = auth.userId;
    next();
};

module.exports = { clerkMiddleware, requireAuth };