"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multiples_1 = __importDefault(require("./multiples"));
const collections_1 = __importDefault(require("./collections"));
const routes = (0, express_1.Router)();
routes.use('/multiples', multiples_1.default);
routes.use('/collections', collections_1.default);
exports.default = routes;
