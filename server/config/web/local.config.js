module.exports =  {
    websiteBaseUrl: 'http://localhost:8080',
    dbConnection: 'mongodb://localhost:27017/sweetblu',
    jwtOptions: {
        expiresInHours: 6,
        issuer: 'SweetBluLocal',
        audience: 'http://localhost:8080'
    }
}