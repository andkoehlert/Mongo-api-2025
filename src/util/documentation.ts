import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';
import { Agent } from 'http';

/**
 * Setup Swagger documentation
 * @param app 
 */
export function setupDocs(app: Application) {

    // swagger definition
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Title',
            version: '1.0.0',
            description: 'Description',
        },
        //: https://mongo-api-2025.onrender.com/api for render online
        // http://localhost:4000/api for localhost
        servers: [
            {
                url: ' https://mongo-api-2025.onrender.com/api',
                description: 'Local development server',
            }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        agent: { type: 'string' },
                        description: { type: 'string' },
                        imageURL: { type: 'string' },
                        age: { type: 'number' },
                        wanted: { type: 'boolean' },
                        notWanted: { type: 'boolean' },
                        species: { type: 'string' },
                        friendly: { type: 'boolean' },
                        hostile: { type: 'boolean' },
                        ducksAssassinated: {type: 'number'},
                        _createdBy: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                        registerDate: { type: 'string' },
                    },
                },
            },
        }
    }

    // swagger options
    const options = {
        swaggerDefinition,
        // Path to the files containing OpenAPI definitions
        apis: ['**/*.ts']
    }

    // swagger spec
    const swaggerSpec = swaggerJSDoc(options);

    // create docs route
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); }