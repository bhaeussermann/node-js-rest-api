'use strict';

import express from 'express';
import asyncHandler from 'express-async-handler';
import { EmployeesService } from '../services/employees-service.js';
import { EmployeeNotFoundError } from '../services/employee-not-found-error.js';
import { ExpressError } from '../express-error.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *         lastName:
 *           type: string
 *         firstName:
 *           type: string
 *         title:
 *           type: string
 *       required: [ lastName, firstName, title ]
 *     EmployeeSansID:
 *       type: object
 *       properties:
 *         lastName:
 *           type: string
 *         firstName:
 *           type: string
 *         title:
 *           type: string
 *       required: [ lastName, firstName, title ]
 *     EmployeeUpdate:
 *       type: object
 *       properties:
 *         lastName:
 *           type: string
 *         firstName:
 *           type: string
 *         title:
 *           type: string
 */
export class EmployeesController {
  /**
   * Hooks up the employees REST-routes to their respective implementations in the provided employees service.
   * @param {express.Express} app The Express app to add the employees routes to.
   * @param {EmployeesService} service The employees service implementing the employees operations.
   */
  static registerRoutes(app, service) {
    /**
     * @openapi
     * /employees:
     *    get:
     *      summary: Get all employees
     *      operationId: GetAllEmployees
     *      tags: [ Employees ]
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: "#/components/schemas/Employee"
     */
    app.get('/employees', (_req, res) => res.json(service.getAll()));

    /**
     * @openapi
     * /employees:
     *   post:
     *     summary: Add a new employee
     *     operationId: AddEmployee
     *     tags: [ Employees ]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/EmployeeSansID"
     *     responses:
     *       "200":
     *         description: successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   format: int32
     */
    app.post('/employees', (req, res) => {
      const employeeId = service.add(req.body);
      res.json({ id: employeeId });
    });
    
    /**
     * @openapi
     * "/employees/{employeeId}":
     *   get:
     *     summary: Find employee by ID
     *     operationId: GetEmployeeByID
     *     tags: [ Employees ]
     *     parameters:
     *       - name: employeeId
     *         in: path
     *         required: true
     *         schema:
     *           type: integer
     *           format: int32
     *     responses:
     *       "200":
     *         description: successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Employee"
     *       "404":
     *         description: Employee not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     */
    app.get('/employees/:employeeId', asyncHandler(async (req, res) => {
      try {
        res.json(await service.get(+req.params.employeeId));
      } catch (error) {
        if (error instanceof EmployeeNotFoundError) throw new ExpressError(404, error.message);
        throw error;
      }
    }));

    /**
     * @openapi
     * "/employees/{employeeId}":
     *   put:
     *     summary: Updates an employee
     *     operationId: UpdateEmployee
     *     tags: [ Employees ]
     *     parameters:
     *       - name: employeeId
     *         in: path
     *         required: true
     *         schema:
     *           type: integer
     *           format: int32
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/EmployeeUpdate"
     *     responses:
     *       "200":
     *         description: successful operation
     *       "404":
     *         description: Employee not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     */
    app.put('/employees/:employeeId', (req, res) => {
      try {
        service.update(+req.params.employeeId, req.body);
        res.sendStatus(200);
      } catch (error) {
        if (error instanceof EmployeeNotFoundError) throw new ExpressError(404, error.message);
        throw error;
      }
    });

    /**
     * @openapi
     * "/employees/{employeeId}":
     *   delete:
     *     summary: Deletes an employee
     *     operationId: DeleteEmployee
     *     tags: [ Employees ]
     *     parameters:
     *       - name: employeeId
     *         in: path
     *         required: true
     *         schema:
     *           type: integer
     *           format: int32
     *     responses:
     *       "200":
     *         description: successful operation
     */
    app.delete('/employees/:employeeId', (req, res) => {
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
