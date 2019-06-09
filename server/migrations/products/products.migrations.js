const ProductModel = require('../../models/product');
const csv = require('csv-parser');
const fs = require('fs');
const async = require("async");

const products = [];
let isFirstProductPushError = true;
let isFirstProductSaveError = true;


module.exports = (() => {
    fs.createReadStream(__dirname + '/products.csv')
        .on('error', err => console.log('Product migration error', err))
        .pipe(csv())
        .on('data', addCsvObjToProducts)
        .on('end', () => {
            async.each(products, async product => {
                try {
                    const existingProduct = await ProductModel.findOne({
                        title: product.title,
                        sku: product.sku
                    });
                    if (!existingProduct) {
                        addNewProduct(product);
                    }
                }
                catch (err) {
                    // Try adding new product anyway
                    addNewProduct(product);
                }
            });
        });
})();

async function addNewProduct(product) {
    try {
        await new ProductModel(product).save();
    }
    catch (err) {
        if (isFirstProductSaveError) {
            console.log('Product save error - product', product);
            console.log('Product save error - error', err);
            isFirstProductSaveError = false;
        }
    }
}

function getArrayFromString(str) {
    return str.replace(/^,|,$/g,'').split(',');
}

function getBooleanFromString(str) {
    if (typeof str === 'boolean') {
        return str;
    } 
    else if (typeof str === 'string'){
        return str.toLowerCase() === 'true' ? true : false;
    }
    else {
        return false;
    }
}

function addCsvObjToProducts (product){
    try {
        if (!product['Title']) return; // Don't add if no title
        products.push({
            title: product['Title'],
            description: product['Description'],
            productPage: product['Product Page'],
            productUrl: product['Product URL'],
            productType: product['Product Type'],
            tags: getArrayFromString(product['Tags']),
            categories: getArrayFromString(product['Categories']),
            visible: getBooleanFromString(product['Visible']),
            imageUrls: getArrayFromString(product['Hosted Image URLs']),
            sku: product['SKU'].replace(/^,|,$/g,''),
            vendor: product['Option Value 1'],
            price: {
                price: product['Price'].split(' ')[0],
                currency: product['Price'].split(' ')[1]
            },
            salePrice: {
                price: product['Sale Price'].split(' ')[0],
                currency: product['Sale Price'].split(' ')[1]
            },
            onSale: getBooleanFromString(product['On Sale']),
            stock: product['Stock'],
            measurements: {
                weight: product['Weight'],
                length: product['Length'],
                width: product['Width'],
                height: product['Height']
            }
        });
    } catch (err) {
        if (isFirstProductPushError) {
            console.log('Product push error', err);
            isFirstProductPushError = false;
        }
    }
}