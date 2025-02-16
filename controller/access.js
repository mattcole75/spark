const config = require("../config/config");
const securityToken = config.get("securityToken")

const authenticate = (req, next) => {

    if(req.headers.idtoken !== securityToken)
        next({status: 401, err: "Yeah... Nah!"});
    else
        next(null);
};

module.exports = {
    authenticate: authenticate
}