import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc";
import { Request, Response } from "express";


 const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0",
      description: "A simple express library API",
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

const sawggerDocs = (app: any, port: any) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
  })

  console.log(`ready at http://localhost:${port}/docs`);
  
}

export { sawggerDocs };
