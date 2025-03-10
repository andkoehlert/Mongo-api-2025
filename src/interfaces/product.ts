import {User} from './users';

export interface ProDuck extends Document {
name: string;
agent: string;
description: string;
imageURL: string;
age: number;
wanted: boolean;
notWanted: boolean;
species: string;
friendly: boolean;
hostile: boolean;
ducksAssassinated: number
isHidden: boolean;
_createdBy: User['id'];
}