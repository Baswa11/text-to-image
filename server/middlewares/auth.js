import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again" })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (decodedToken.id) {
            req.body = req.body || {}; // Initialize req.body if it doesn't exist (e.g., GET requests)
            req.body.userId = decodedToken.id
        } else {
            return res.json({ success: false, message: "Not Authorized. Login Again" })
        }

        next();

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export default userAuth 