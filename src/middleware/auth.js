const Utils = require('../foundation/utils');
const AUTH_TOKEN = process.env.TOKEN;

module.exports = async (req, res, next) => {
    try {
        if (Utils.notAssigned(req.header('Authorization'))) {
            throw new Error();
        } else {
            const token = req.header('Authorization').replace('Bearer ', '');
            if (token != AUTH_TOKEN) {
                throw new Error();
            }
        }

        next()
    } catch (err) {
        res.status(403).send({
            ApiStatus: false,
            ApiStatusCode: 403,
            ApiStatusMessage: 'Authorization failed! It is forbidden.',
            Data: null
        });
    }
}