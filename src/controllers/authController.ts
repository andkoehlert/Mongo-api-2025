import {
  type Request,
  type Response, 
  type NextFunction
} from "express";


import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import Joi, { ValidationResult } from "joi";


// projects imports 

import { userModel } from "../models/userModels";
import { User } from "../interfaces/users";
import { connect, disconnect } from '../repository/database'


/**
 * Register a new user  
 * @param req
 * @param Response
 * @returns
 */
export async function registerUsers(req: Request, res: Response) {
  try {
    // validate user and password
      const { error } = validateUserRegistrationInfo(req.body);

      if (error) {
        res.status(400).json({error: error.details[0].message});
        return;
      }

      await connect();

      const emailExists = await userModel.findOne( { email: req.body.email});

      if (emailExists) {
        res.status(400).json({ error: "Email already exists."});
        return;
      };






// hash

const salt = await bcrypt.genSalt(10);
const passwordHashed = await bcrypt.hash(req.body.password, salt);

// create a user obbject save in db
const userObject = new userModel( {
  name: req.body.name,
  email: req.body.email,
  password: passwordHashed
});

const savedUser = await userObject.save();
res.status(200).json ( {error: null, data: savedUser._id});

  }
  catch (error) {
res.status(500).send("Error regisering user. Error: " + error);
  }
  finally {
await disconnect();
  }
};


// login
/**login existing user
 * @param req
 * @param res
 * @returns
 */
export async function loginUser(req: Request, res: Response) {
  
  try {
    const { error} = validateUserLoginInfo(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message});
      return;
    }

    await connect();

    const user: User | null = await userModel.findOne( { email: req.body.email});

    if (!user) {
      res.status(400).json({error: "Password or email is wrong"});
      return;
    }
    else {
      const validPassword: boolean = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        res.status(400).json({error: "Password or email is wrong."});
        return;
      }

      const userId: string = user.id;
      const token: string = jwt.sign(
        {
          // payload
          name: user.name,
          email: user.email,
          id: userId
        },
        process.env.TOKEN_SECRET as string,
        {expiresIn: '2h'}
      );

      // attach the token and send it
      res.status(200).header("auth-token", token).json({ error: null, data: {userId, token}})
    }
  }

  catch (error) {
res.status(500).send("Error loggin in user. Error: " + error);
  }
  finally {
    await disconnect();
  }
};


// middelware logic to verify the clitent jtw token
/**login existing user
 * @param req
 * @param res
 * @returns
 */

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("auth-token");


  if (!token) {
    res.status(400).json({error: "access Denied."});
    return;
  }

  try {
if (token) 
    jwt.verify(token, process.env.TOKEN_SECRET as string);

next();
  }

  catch {
    res.status(401).send("Invaild Token");
  }
}

/**  

 * validate user register
 * @param data 
 */
export function validateUserRegistrationInfo(data: User): ValidationResult {

const schema = Joi.object( {
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required(),
  password: Joi.string().min(6).max(20).required()
});

return schema.validate(data)

}




/**  

 * validate user login 
 * @param data 
 */
export function validateUserLoginInfo(data: User): ValidationResult {

  const schema = Joi.object( {
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(20).required()
  });
  
  return schema.validate(data)
  
  }