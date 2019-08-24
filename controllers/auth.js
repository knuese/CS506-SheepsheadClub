const users = [];

const getIp = (req) => {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.sockert.remoteAddress;
}

const remove = (ip) => {
    const index = users.indexOf(ip);
    if (index > -1) {
        users.splice(index);
    }
}

module.exports = {
    login: function(req) {
        const ip = getIp(req);
        console.log(`--------------Logging in ${ip}--------------`);
        users.push(ip);
        setTimeout((ip) => remove(ip), 1000 * 60 * 5);
    },
    isLoggedIn: function(req) {
        const ip = getIp(req);
        console.log(`--------------${ip} is logged in: ${users.includes(ip)}--------------`);
        return users.includes(ip);
    },
    logout: function(req) {
        const ip = getIp(req);
        console.log(`--------------Logging out ${ip}--------------`);
        remove(ip);
    }
}