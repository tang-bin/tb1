"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const config_1 = require("./config");
const sysRouter_1 = require("./router/sysRouter");
const apiRouter_1 = require("./router/apiRouter");
const contentRouter_1 = require("./router/contentRouter");
const sysLog_1 = require("./util/sysLog");
// init
config_1.config.load();
// TODO: init data.
const app = express();
// router
if (config_1.config.enableHttps) {
    app.all("*", (req, res, next) => {
        if (req.protocol === "https")
            next();
        else
            res.redirect("https://" + req.hostname + ":" + config_1.config.httpsPort + req.originalUrl);
    });
}
app.use("/sys/", sysRouter_1.sysRouter.router);
app.use("/api/", apiRouter_1.apiRouter.router);
app.use("/", contentRouter_1.contentRouter.router);
// http server
http.createServer(app).listen(config_1.config.httpPort, () => {
    sysLog_1.sysLog.log("Start HTTP server at", config_1.config.httpPort);
});
// https server
if (config_1.config.enableHttps) {
    const key = fs.readFileSync(config_1.config.keyPath, 'utf8'), cert = fs.readFileSync(config_1.config.crtPath, 'utf8'), credentials = { key, cert };
    https.createServer(credentials, app).listen(config_1.config.httpsPort, () => {
        sysLog_1.sysLog.log("Start HTTPS server at", config_1.config.httpsPort);
    });
}
//# sourceMappingURL=app.js.map