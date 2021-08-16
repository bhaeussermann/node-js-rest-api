'use strict';

import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import OpenApiValidator from 'express-openapi-validator';
import { EmployeesService } from './services/employees-service.js';
import { EmployeesController } from './controllers/employees-controller.js';

const app = express();
const port = 3000;

app.use(express.json());

const swaggerJsDocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Northwind',
      version: '1.0.0',
      description: 'A simple REST API for providing basic CRUD-access to the employees in a Northwind database.'
    }
  },
  apis: ['./src/controllers/*.js', './src/express-error.js']
};
const apiSpec = swaggerJsDoc(swaggerJsDocOptions);

app.get('/swagger.json', (_req, res) => res.json(apiSpec));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(null, { swaggerOptions: { url: '/swagger.json' } }));

app.use(OpenApiValidator.middleware({
  apiSpec,
  validateRequests: true,
  validateResponses: true
}));

EmployeesController.registerRoutes(app, new EmployeesService());

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  });
});

app.listen(port);

console.log('Employees API server started on port ' + port);
