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
  constructor(public status: number, message: string) {
    super(message);
  }
}
