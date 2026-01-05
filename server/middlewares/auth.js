import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (decodedToken.id) {
            req.body.userId = decodedToken.id
        } else {
            return res.status(401).json({ message: "Unauthorized" })
        }

        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

export default userAuth 