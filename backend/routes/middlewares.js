import jwt from "jsonwebtoken";

// Authentication Middleware
export function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Forbidden");
        req.user = user;
        next();
    });
}

// Admin-Only Middleware
export function adminOnly(req, res, next) {
    if (req.user.role !== "admin") return res.status(403).send("Admins only");
    next();
}
