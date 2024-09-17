declare module 'swagger-jsdoc' {
    interface SwaggerDefinition {
      openapi: string;
      info: {
        title: string;
        version: string;
        description: string;
      };
      servers: {
        url: string;
      }[];
    }
  
    interface Options {
      swaggerDefinition: SwaggerDefinition;
      apis: string[];
    }
  
    function swaggerJsDoc(options: Options): any;
  
    export = swaggerJsDoc;
  }
  