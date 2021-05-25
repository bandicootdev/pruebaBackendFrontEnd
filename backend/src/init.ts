import express, { Express } from 'express';

import cors from 'cors';

const init = (app: Express) => {
  app.use(cors({
    origin: true,
  }));

  app.use(express.urlencoded({
    extended: true,
  }));

  app.use(express.json());

  return app;
};

export default init;
