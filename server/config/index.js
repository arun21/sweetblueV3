module.exports = (function () {
    const env = process.env.NODE_ENV || 'LOCAL';
    let config;

    switch (env) {
        case 'LOCAL':
            config = require('./web/local.config');
            break;

        case 'DEV':
            config = require('./web/dev.config');
            break;

        default:
            config = require('./web/prod.config');
            break;
    }

    console.log('Env', env);

    // Return single config object
    return {
        email: {
            apikey: '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',
            senderEmailaddress: 'no-reply@sweetblu.com',
            templateId: '',
            senderName: 'Sweetblu'
        },
        jwtOptions: config.jwtOptions,
        dbConnection: config.dbConnection,
        websiteBaseUrl: config.websiteBaseUrl
    }
})();