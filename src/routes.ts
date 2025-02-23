import {Router, Request, Response} from 'express';
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById} from './controllers/productController';
import {registerUsers, loginUser, verifyToken} from './controllers/authController'
const router: Router = Router();

// get, post, put, delete
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World');
});


// auth
router.post('/user/register', registerUsers)
router.post('/user/login', loginUser);

router.post('/products', verifyToken, createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', verifyToken,  updateProductById);
router.delete('/products/:id', verifyToken, deleteProductById);

export default router;