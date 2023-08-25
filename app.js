require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./docs/swagger/swagger_output.json')
const logger = require('./config/logger'); 

const bodyParser = require('body-parser');
const db = require('./config/databases/sqlite');
const userRoute = require('./src/routes/admin');
const generalRoute = require('./src/routes/api')
const authRoute = require('./src/routes/auth')

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to database
db.sync().then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.error('Database connection error:', err);
});

// Routes
app.use('/', generalRoute);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(authRoute)
app.use(userRoute);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something went wrong!');
});
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});