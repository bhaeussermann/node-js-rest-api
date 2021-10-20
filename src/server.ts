import sourceMapSupport from 'source-map-support';
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { EmployeesService } from './services/employees-service';
import { EmployeesController } from './controllers/employees-controller';
import { ExpressError } from './express-error';

sourceMapSupport.install();

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
  apis: ['./src/controllers/*.ts', './src/express-error.ts']
};
const apiSpec = swaggerJsDoc(swaggerJsDocOptions) as unknown as string;

app.get('/swagger.json', (_req, res) => res.json(apiSpec));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: '/swagger.json' } }));

app.use(OpenApiValidator.middleware({
  apiSpec,
  validateRequests: true,
  validateResponses: true
}));

EmployeesController.registerRoutes(app, new EmployeesService());

app.use((err: Error, _req: unknown, res: ResponseType, _next: unknown) => {
  console.error(err);
  res.status((err as ExpressError).status || 500).json({
    message: err.message
  });
});

app.listen(port);

console.log('Employees API server started on port ' + port);

type ResponseType = { status: (status: number) => any };
