const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const fs = require("fs")
const YAML = require('yaml')
const router = require('./router');
const path = require('path');

app.use(express.json())
app.use(router)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Define your Swagger UI documents

const file = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');

const swaggerDocument = YAML.parse(file)
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const swaggerOptions = {
  definition: swaggerDocument,
  apis: ['./index.js'],

};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL }));

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});