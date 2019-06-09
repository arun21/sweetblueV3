const RolesModel = require('../models/roles');
const async = require("async");
const roles = ['customer'];


module.exports = (() => {
    let isFirstError = true;
    async.each(roles, async role => {
        try {
            const existing = await RolesModel.findOne({name: role});
            if (!existing) {
                await new RolesModel({ name: role }).save();
            }
        }
        catch (e) {
            if (isFirstError) {
                console.log('Roles Migration error', e);
                isFirstError = false;
            }
        }
    });
})();