import {Router, Request, Response} from 'express';
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById, getNotWantedDucks, getWantedDucks} from './controllers/productController';
import {registerUsers, loginUser, verifyToken} from './controllers/authController'
const router: Router = Router();


/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the api is running
 *     responses:
 *       200:
 *         description: Server up and running.
 */

// get, post, put, delete
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World');
});

// auth
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Takes a user in the body and tries to register it in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */

// auth
router.post('/user/register', registerUsers)

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Login an existing user
 *     description: Logs in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in succesfully
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */

router.post('/user/login', loginUser);
/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - ProDuck Routes
 *     summary: Create a new ProDuck
 *     description: Create a new Product
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *           example:
 *             name: "Mr. Burns statue"
 *             agent: "007"
 *             description: "The best and precious statue ever"
 *             imageURL: "https://random-d.uk/api/v2/randomimg"
 *             age: 7
 *             wanted: true
 *             notWanted: true
 *             birthday: 3
 *             species: gråand
 *             friendly: true
 *             hostile: false
 *             ducksAssassinated: 0
 *             isHidden: false
 *             _createdBy: "6748771972ba527f3a17a313"
 *     responses:
 *       201:
 *         description: Product created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */
router.post('/products',  createProduct);


/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - ProDuck Routes
 *     summary: Retrieves ProDuck products with optional filtering
 *     description: Fetch all producks with optional filters for hostile or friendly status.
 *     parameters:
 *       - in: query
 *         name: hostile
 *         schema:
 *           type: boolean
 *         description: Filter producks by hostile status (true or false).
 *       - in: query
 *         name: friendly
 *         schema:
 *           type: boolean
 *         description: Filter producks by friendly status (true or false).
 *     responses:
 *       200:
 *         description: A list of producks JSON objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */

/**
 * @swagger
 * /products/wanted:
 *   get:
 *     tags:
 *       - Product Routes
 *     summary: Retrieves all ducks that are wanted
 *     description:
 *     responses:
 *       200:
 *         description: A list of Product JSON objects in an array.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
router.get('/products/wanted', getWantedDucks);

/**
 * @swagger
 * /products/notwanted:
 *   get:
 *     tags:
 *       - Product Routes
 *     summary: Retrieves all ducks that are not wanted
 *     description:
 *     responses:
 *       200:
 *         description: A list of Product JSON objects in an array.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
router.get('/products/notwanted', getNotWantedDucks);


router.get('/products', getAllProducts);



/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Product Routes
 *     summary: Specific producks
 *     description: Retrieves a specific producks based on it id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A producks in the format of a JSON object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
router.get('/products/:id', getProductById);

// update + delete
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Product Routes
 *     summary: Updates a specific producks
 *     description: Updates a specific producks based on its id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID from repository
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *
 *     responses:
 *       200:
 *         description: Product updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */

router.put('/products/:id', verifyToken,  updateProductById);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *       - producks Routes
 *     summary: Deletes a specific producks
 *     description: Deletes a specific producks based on it id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *
 *     responses:
 *       201:
 *         description: producks deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */


router.delete('/products/:id', verifyToken, deleteProductById);



export default router;