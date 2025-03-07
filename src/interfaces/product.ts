import {User} from './users';

export interface ProDuck extends Document {
name: string;
agent: string;
description: string;
imageURL: string;
age: number;
birthday: number;
species: string;
friendly: boolean;
hostile: boolean;
isHidden: boolean;
_createdBy: User['id'];
}