const expressJWT = require('express-jwt');
const jwtAuth = expressJWT({
    secret: 'hello',
    algorithms: ['HS256'], // 设置 jwt 的算法
    // 设置为 false，表示如果不带 token 的请求，不进行验证
    // 设置为 true，表示请求带不带 token 都要验证，如果不带 token 的请求，直接验证失败
    credentialsRequired: false
}).unless({
    // 不需要进行验证的接口
    path: ['/users/login', '/users/register']
})
module.exports = jwtAuth;