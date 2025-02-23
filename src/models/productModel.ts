import {Schema, model} from 'mongoose';
import {Product} from '../interfaces/product';

const producktSchema = new Schema<Product>({
  name: { type: String, required: true, min: 6, max: 255},
  description: { type: String, required: true, min: 6, max: 255},
  imageURL: { type: String, required: true},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
  isOnDiscount: { type: Boolean, required: true},
  isHidden: { type: Boolean, required: true},
  _createdBy: { type: String, ref: 'User', required: true}
});

export const productModel = model<Product>('Product', producktSchema);