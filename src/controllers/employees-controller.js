'use strict';

import express from 'express';
import asyncHandler from 'express-async-handler';
import { EmployeesService } from '../services/employees-service.js';
import { EmployeeNotFoundError } from '../services/employee-not-found-error.js';
import { ExpressError } from '../express-error.js';

export class EmployeesController {
  /**
   * Hooks up the employees REST-routes to their respective implementations in the provided employees service.
   * @param {express.Express} app The Express app to add the employees routes to.
   * @param {EmployeesService} service The employees service implementing the employees operations.
   */
  static registerRoutes(app, service) {
    app.route('/employees')
      .get((_req, res) => res.json(service.getAll()))
      .post((req, res) => {
        const employeeId = service.add(req.body);
        res.json({ id: employeeId });
      });
    
    app.route('/employees/:employeeId')
      .get(asyncHandler(async (req, res) => {
        try {
          res.json(await service.get(+req.params.employeeId));
        } catch (error) {
          if (error instanceof EmployeeNotFoundError) throw new ExpressError(404, error.message);
          throw error;
        }
      }))
      .put((req, res) => {
        try {
          service.update(+req.params.employeeId, req.body);
          res.sendStatus(200);
        } catch (error) {
          if (error instanceof EmployeeNotFoundError) throw new ExpressError(404, error.message);
          throw error;
        }
      })
      .delete((req, res) => {
        try {
          service.delete(+req.params.employeeId);
          res.sendStatus(200);
        } catch (error) {
          if (error instanceof EmployeeNotFoundError) throw new ExpressError(404, error.message);
          throw error;
        }
      });
  }
}
