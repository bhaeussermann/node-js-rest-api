'use strict';

import express from 'express';

const app = express();
const port = 3000;

app
  .route('/greeting')
  .get((_req, res) => res.json('hello world!'));

app.listen(port);

console.log('Employees API server started on port ' + port);
