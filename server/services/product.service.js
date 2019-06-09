const Product = require('../models/product');
const docsPerPage = 32;
const defaultFields = 'title vendor price salePrice onSale imageUrls ';

module.exports = function () {
    this.docsPerPage = docsPerPage;

    this.getProducts = async (pageNumber, searchQuery) => {
        const query = { visible: true };
        if (searchQuery) {
            const regexSearchQuery = new RegExp(`^.*${searchQuery}.*$`, 'i');
            query.$or = [ 
                { title: regexSearchQuery },
                { vendor: regexSearchQuery }
            ];
        }
        try {
            return await Promise.all([Product.count(query), getProductsFromDbWithPages(pageNumber, query)])
        }
        catch (err) {
            console.log('Get Products error', err);
            throw 'Unexpected error occurred while getting products';
        }
    }

    this.getProductById = async (id) => {
        try {
            return await Product.findOne({_id: id, visible: true }).select(`${defaultFields} description`);
        }
        catch (err) {
            console.log('Get Product by id error', err);
            throw 'Unexpected error occurred while getting product';
        }
    }

    this.getNewArrivals = async () => {
        const now = new Date();
        const query = {
            visible: true,
            createdAt: {
                $gte: now.setDate(now.getDate() - 7) // & days ago
            }
        };

        try {
            return await getProductsFromDb(query)
                            .sort({'createdAt': -1})
                            .limit(16)
                            .exec();
        } catch (err) {
            console.log('Get new arrivals error', err);
            throw 'Unexpected error occurred while getting new arrivals';
        }
    }
}

function getProductsFromDbWithPages(pageNumber, query) {
    return getProductsFromDb(query)
        .limit(docsPerPage)
        .skip(docsPerPage * pageNumber)
        .exec();
}

function getProductsFromDb(query, additionalFields) {
    const fields = defaultFields + (additionalFields ? additionalFields : '');
    return Product.find(query)
        .select(fields);
}