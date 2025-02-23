import {User} from './users';

export interface Product extends Document {
name: string;
description: string;
imageURL: string;
price: number;
stock: number;
isOnDiscount: boolean;
isHidden: boolean;
_createdBy: User['id'];
}