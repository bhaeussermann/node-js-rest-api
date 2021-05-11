'use strict';

import express from 'express';
import { EmployeesService } from './services/employees-service.js';
import { EmployeesController } from './controllers/employees-controller.js';

const app = express();
const port = 3000;

app.use(express.json());

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
