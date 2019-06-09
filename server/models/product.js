const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('./base-model');

const PriceSchema = new Schema({
    price: Schema.Types.Decimal128,
    currency: String
},
{_id: false});

const ProductSchema = BaseModel.createSchema({
	title: {
		type: String,
        required: true,
        index: true
	},
	description: {
		type: String,
		required: true
    },
    ingredients: [String],
	productPage: String,
    productUrl: String,
    productType: String,
    tags: [String],
    categories: [String],
    visible: Boolean,
    imageUrls: [String],
    sku: String,
    vendor: {
        type: String,
        index: true
    },
    price: PriceSchema,
    salePrice: PriceSchema,
    onSale: Boolean,
    stock: String,
    measurements: {
        weight: Number,
        length: Number,
        width: Number,
        height: Number
    }
});

PriceSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.price = ret.price.toString();
      return ret;
    },
  });

module.exports = mongoose.model('Product', ProductSchema);