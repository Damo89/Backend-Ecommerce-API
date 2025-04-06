const swaggerJSDoc = require('swagger-jsdoc');
const yaml = require('js-yaml');
const fs = require('fs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-commerce platform',
    },
    servers: [
      {
        url: 'http://localhost:3000', //http://localhost:3000/api-docs/
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js', './app.js'],
};

// Generate the Swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Convert to YAML
const yamlStr = yaml.dump(swaggerSpec);

// Write to a file
fs.writeFileSync('./swagger.yaml', yamlStr, 'utf8');

console.log('Swagger YAML generated at ./swagger.yaml');

module.exports = swaggerSpec;