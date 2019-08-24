const users = [];

const remove = (ip) => {
    const index = users.indexOf(ip);
    if (index > -1) {
        users.splice(index);
    }
}

module.exports = {
    login: function(ip) {
        console.log(`Logging in ${ip}`);
        users.push(ip);
        setTimeout((ip) => remove(ip), 1000 * 60 * 5);
    },
    isLoggedIn: function(ip) {
        console.log(`${ip} is logged in: ${users.includes(ip)}`);
        return users.includes(ip);
    },
    logout: function(ip) {
        console.log(`Logging out ${ip}`);
        remove(ip);
    }
}