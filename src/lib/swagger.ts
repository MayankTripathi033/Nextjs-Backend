// swagger.ts

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Next.js API with Swagger',
    version: '1.0.0',
    description: 'A simple CRUD API application built with Next.js and documented with Swagger',
  },
  servers: [
    {
      url: 'https://nextjs-backend-ten.vercel.app/api', // Base URL for your API
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/app/api/**/*.ts'], // Adjust to your folder structure
};

export default options;
