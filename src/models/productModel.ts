import {Schema, model} from 'mongoose';
import {ProDuck} from '../interfaces/product';
import { boolean } from 'joi';

const proDucktSchema = new Schema<ProDuck>({
  name: { type: String, required: true, min: 6, max: 255},
  agent: { type: String, required: true, min: 6, max: 255},
  description: { type: String, required: true, min: 6, max: 255},
  imageURL: { type: String, required: true},
  age: { type: Number, required: true},
  birthday: { type: Number, required: true},
  species: { type: String, required: true},
  friendly: {type: Boolean, required: true},
  hostile: {type: Boolean, required: true},
  isHidden: { type: Boolean, required: true},
  _createdBy: { type: String, ref: 'User', required: true}
});

export const productModel = model<ProDuck>('ProDuck', proDucktSchema);