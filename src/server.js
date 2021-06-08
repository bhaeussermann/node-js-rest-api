'use strict';

import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { EmployeesService } from './services/employees-service.js';
import { EmployeesController } from './controllers/employees-controller.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(OpenApiValidator.middleware({
  apiSpec: './src/api-spec.yaml',
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
