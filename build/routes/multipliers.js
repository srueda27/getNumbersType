"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multiplier_controller_1 = require("../controllers/multiplier.controller");
const router = (0, express_1.Router)();
router.get('/value/:number', function (request, response) {
});
router.get('/colletion100', function (request, response) {
    let list = [];
    for (let i = 1; i < 101; i++) {
        list.push(multiplier_controller_1.multiplierController.getNumberType(i));
    }
    response.status(200).json({
        list
    });
});
