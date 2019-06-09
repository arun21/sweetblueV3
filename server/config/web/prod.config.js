module.exports = {
    websiteBaseUrl: 'http://www.sweetblu.com/',
    dbConnection: 'mongodb://sweetblu:jhfsjfhs343cc34c32cc3r@localhost:27017/sweetblu?authSource=admin',
    jwtOptions: {
        expiresInHours: 6,
        issuer: 'SweetBlu.com',
        audience: 'http://sweetblu.com'
    }
}