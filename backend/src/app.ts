import express from 'express';
import routes from './routes';
import init from './init';

const app = express();

init(app);

app.use(routes);

export default app;
