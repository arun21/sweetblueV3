module.exports =  {
    websiteBaseUrl: 'http://dev.dolceblu.com',
    dbConnection: 'mongodb://localhost:27017/sweetblu',
    jwtOptions: {
        expiresInHours: 6,
        issuer: 'SweetBluDev',
        audience: 'http://dev.dolceblu.com'
    }
}