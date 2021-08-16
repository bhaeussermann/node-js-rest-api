'use strict';

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */
export class ExpressError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
