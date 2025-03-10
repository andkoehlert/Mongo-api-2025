import { Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { connect, disconnect } from '../repository/database';


/**
 * Creates a new product in the data source based on the request body
 * @param req 
 * @param res 
 */

export async function createProduct(req: Request, res: Response): Promise<void> {
  const data = req.body;

  try {
await connect();

const product = new productModel(data);
const result = await product.save();

res.status(201).send(result);
  }
  catch (error) {
res.status(500).send('Internal Server Error .Error: ' + error);
  }
  finally {
await disconnect();
  }
}



/**
 * Retrieves all products from the data source
 * @param req 
 * @param res 
 */

export async function getAllProducts(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    // Filtrering baseret på query-parametre
    const filter: any = {};

    if (req.query.hostile !== undefined) {
      filter.hostile = req.query.hostile === 'true'; // Filtrer ved hjælp af boolean
    }

    if (req.query.friendly !== undefined) {
      filter.friendly = req.query.friendly === 'true';
    }

    const result = await productModel.find(filter); // Find produkter med de givne filtre
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error. Error: ' + error);
  } finally {
    await disconnect();
  }
}



/**
 * Retrieves all products from the data source
 * @param req 
 * @param res 
 */

export async function getProductById(req: Request, res: Response): Promise<void> {
  // We are not sending any data in the request body
  //  const data = req.body;
 
   try {
 await connect();
 
const id = req.params.id;
 const result = await productModel.find({_id: id});
 
 res.status(200).send(result);
   }
   catch (error) {
 res.status(500).send('Internal Server Error .Error: ' + error);
   }
   finally {
 await disconnect();
   }
 }

 /**
 * Retrieves all products from the data source
 * @param req 
 * @param res 
 */

export async function updateProductById(req: Request, res: Response) {

  const id = req.params.id;
 
   try {
 await connect();
 

 const result = await productModel.findByIdAndUpdate(id, req.body);
 
 if (!result ) {
  res.status(404).send('Product not found=' + id);
  
 }
 else {
 res.status(200).send('Product updated successfully');
   } 
  }


   catch (error) {
 res.status(500).send('Internal Server Error .Error: ' + error);
   }
   finally {
 await disconnect();
   }
 }

 /**
 * Retrieves all products from the data source
 * @param req 
 * @param res 
 */

export async function deleteProductById(req: Request, res: Response) {

  const id = req.params.id;
 
   try {
 await connect();
 

 const result = await productModel.findByIdAndDelete(id);
 
 if (!result ) {
  res.status(404).send('cannot delete product with id=' + id);
  
 }
 else {
 res.status(200).send('Product deleted successfully');
   } 
  }


   catch (error) {
 res.status(500).send('Error deleting product by id .Error: ' + error);
   }
   finally {
 await disconnect();
   }
 }