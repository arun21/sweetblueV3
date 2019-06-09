module.exports = (() => {
    require('./products/products.migrations');
    require('./tags/tags.migrations');
    require('./filters.migration');
    require('./roles.migration');
})();