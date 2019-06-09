const FiltersModel = require('../models/filters');
const async = require("async");
const filters = ['Price', 'Ethics', 'Local', 'Diet Weight', 'Value', 'Fair trade', 'Nutrition', 'Grocery'];


module.exports = (() => {
    let isFirstError = true;
    async.each(filters, async filter => {
        try {
            const existing = await FiltersModel.findOne({name: filter});
            if (!existing) {
                await new FiltersModel({ name: filter }).save();
            }
        }
        catch (e) {
            if (isFirstError) {
                console.log('Filters Migration error', e);
                isFirstError = false;
            }
        }
    });
})();