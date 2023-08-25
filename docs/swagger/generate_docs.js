const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
      title: 'Microblog API',
      description: 'Description',
    },
    host: 'localhost:3001',
    schemes: ['http'],
  };

const outputFile = './docs/swagger/swagger_output.json'
const endpointsFiles = ['./src/routes/api.js','./src/routes/auth.js','./src/routes/admin.js']

swaggerAutogen(outputFile, endpointsFiles, doc)