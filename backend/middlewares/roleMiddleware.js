const roleMiddleware = (req, res, next) => {
    const userRole = req.user.role;

    if(userRole !== 'admin') {
        return res.status(403).json({ msg: 'Acceso denegado, no tiene permisos para realizar esta acción' });
    }

    next();
}

export default roleMiddleware;