import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ status: 'error', message: 'acceso denegado' })
    }

    const token = authorization.split(' ')[1]

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = tokenDecoded // adjuntar usuario decodificado a la request
        next()
    } catch {
        return res.status(401).json({ status: 'error', message: 'acceso denegado' })
    }

}
