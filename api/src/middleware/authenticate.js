import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: "Missing auth header" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // e.g., { userId: 1, isAdmin: true }
        next();
    } catch {
        res.status(403).json({ error: "Invalid token" });
    }
};

export const requireAdmin = (req, res, next) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
    }
    next();
};
