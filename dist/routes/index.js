"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const handleError_middleware_1 = __importDefault(require("../middlewares/handleError.middleware"));
const bills_routes_1 = __importDefault(require("./bills.routes"));
const consumerUnit_routes_1 = __importDefault(require("./consumerUnit.routes"));
const appRoutes = (app) => {
    app.use("/bills", bills_routes_1.default);
    app.use("/consumer", consumerUnit_routes_1.default);
    app.use(handleError_middleware_1.default);
};
exports.default = appRoutes;
