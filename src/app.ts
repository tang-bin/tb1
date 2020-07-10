// app.ts
import express = require('express');
import { config } from "./config";
import { sysRouter } from './router/sysRouter';
import { apiRouter } from './router/apiRouter';
import { contentRouter } from './router/contentRouter';

config.load();

const app: express.Application = express();

app.use("/sys/", sysRouter.router);
app.use("/api/", apiRouter.router);
app.use("/", contentRouter.router);

app.listen(config.port, function () {
  console.log('Example app listening on port 3000!');
});