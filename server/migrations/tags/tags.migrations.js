const TagsModel = require('../../models/tags');
const async = require("async");
const tags = require('./tags');


module.exports = (() => {
    let isFirstError = true;
    async.each(tags, async tag => {
        try {
            const existingTag = await TagsModel.findOne({name: tag});
            if (!existingTag) {
                await new TagsModel({ name: tag }).save();
            }
        }
        catch (e) {
            if (isFirstError) {
                console.log('Tags Migration error', e);
                isFirstError = false;
            }
        }
    });
})();