"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consumerUnit_controller_1 = require("../controllers/consumerUnit/consumerUnit.controller");
const consumerRouter = (0, express_1.Router)();
consumerRouter.get("/", consumerUnit_controller_1.getConsumerUnitsWithBillsController);
exports.default = consumerRouter;
