// import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

// const swaggerDefinition: OAS3Definition = {
//   openapi: "3.0.0",
//   info: {
//     title: "Documentacion de API-MOVIES-TYPESCRIPT",
//     version: "1.0.0",
//   },
//   servers: [
//     {
//       url: "http://localhost:4000/",
//     },
//   ],
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: "http",
//         scheme: "bearer",
//       },
//     },
//     schemas: {
//       user: {
//         type: "object",
//         required: ["name", "password", "email"],
//         properties: {
//           name: {
//             type: "string",
//           },
//           email: {
//             type: "string",
//           },
//           password: {
//             type: "string",
//           },
//           status: {
//             type: "string",
//           },
//           role: {
//             type: "string",
//           },
//           reviews: {
//             type: "array",
//           },
//         },
//       },
//       auth: {
//         type: "object",
//         required: ["password", "email"],
//         properties: {
//           email: {
//             type: "string",
//           },
//           password: {
//             type: "string",
//           }
//         },
//       },
//       review: {
//         type: "object",
//         required: ["tltle", "text"],
//         properties: {
//           tltle: {
//             type: "string",
//           },
//           text: {
//             type: "string",
//           },
//           rating: {
//             type: "number",
//           },
//           status: {
//             type: "string",
//           },
//           userId: {
//             type: "objectId",
//           },
//           movieId: {
//             type: "objectId",
//           },
//         },
//       },
//       movie: {
//         type: "object",
//         required: ["tltle", "description", "duration"],
//         properties: {
//           tltle: {
//             type: "string",
//           },
//           description: {
//             type: "string",
//           },
//           duration: {
//             type: "string",
//           },
//           status: {
//             type: "string",
//           },
//           top: {
//             type: "number",
//           },
//           genre: {
//             type: "string",
//           },
//           image: {
//             type: "string",
//           },
//           reviews: {
//             type: "array",
//           },
//           actorsId: {
//             type: "array",
//           },
//         },
//       },
//       actor: {
//         type: "object",
//         required: ["name", "country"],
//         properties: {
//           name: {
//             type: "string",
//           },
//           country: {
//             type: "string",
//           },
//           age: {
//             type: "number",
//           },
//           status: {
//             type: "string",
//           },
//           oscarsPrizes: {
//             type: "number",
//           },
//           genre: {
//             type: "string",
//           },
//           image: {
//             type: "string",
//           },
//           movies: {
//             type: "array",
//           }
//         },
//       },
//     },
//   },
// };

// const swaggerOptions: OAS3Options = {
//   swaggerDefinition,
//   apis: ["./src/routes/*.ts"],
// };

// export default swaggerJSDoc(swaggerOptions);


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
  apis: ["../routes/*.ts"],
};

export default options;

