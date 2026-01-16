import jwt from 'jsonwebtoken'

const AuthMiddleware = (req, res, next) => {

    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ success: false, error: "Please authenticate using token" });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, error: "Please authenticate using token" });
    }
}

export default AuthMiddleware;