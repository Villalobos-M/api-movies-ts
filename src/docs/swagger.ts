import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc";
import { Request, Response } from "express";

 const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0",
      description: "It is a movie API, for demonstrative and non-professional purposes that exemplifies routes for a movie web page, where you can add movies and authors as long as a user is registered with the admin role, the rest of users can only get information",
    },
    servers: [
      {
        url: "https://api-movies-ts.up.railway.app",
      },
    ],
  },
  apis: ["src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options)

const sawggerDocs = (app: any) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
  })
  
}

export { sawggerDocs };
