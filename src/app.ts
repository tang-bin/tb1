// app.ts
import express = require('express');
import http = require("http");
import https = require("https");
import fs = require("fs");
import { config } from "./config";
import { sysRouter } from './router/sysRouter';
import { apiRouter } from './router/apiRouter';
import { contentRouter } from './router/contentRouter';
import { sysLog } from './util/sysLog';

// init
config.load();
// TODO: init data.
const app: express.Application = express();

// router
if (config.enableHttps) {
  app.all("*", (req, res, next) => {
    if (req.protocol === "https") next();
    else res.redirect("https://" + req.hostname + ":" + config.httpsPort + req.originalUrl);
  });
}
app.use("/sys/", sysRouter.router);
app.use("/api/", apiRouter.router);
app.use("/", contentRouter.router);

// http server
http.createServer(app).listen(config.httpPort, () => {
  sysLog.log("Start HTTP server at", config.httpPort);
});

// https server
if (config.enableHttps) {
  const key = fs.readFileSync(config.keyPath, 'utf8')
    , cert = fs.readFileSync(config.crtPath, 'utf8')
    , credentials = { key, cert };
  https.createServer(credentials, app).listen(config.httpsPort, () => {
    sysLog.log("Start HTTPS server at", config.httpsPort);
  });
}