const bcrypt = require('bcryptjs');
const saltRounds = 10;


module.exports = {
    hashString: async (stringToHash) => {
        try {
            return await bcrypt.hash(stringToHash, saltRounds);
        }
        catch (err) {
            console.log(err);
            throw 'Unexpected error occurred.';
        }
    },
    compareHash: async (candiate, hash) => {
        return await bcrypt.compare(candiate, hash);
    }
}