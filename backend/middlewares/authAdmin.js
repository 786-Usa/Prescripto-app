import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }
        req.user = decoded;
        next();
    } catch (error) {
         console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export default authAdmin;
