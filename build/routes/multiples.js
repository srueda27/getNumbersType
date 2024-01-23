"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multiplesService_1 = require("../services/multiplesService");
const router = (0, express_1.Router)();
router.get('/100list', function (request, response) {
    let list = [];
    for (let i = 1; i < 101; i++) {
        list.push(multiplesService_1.multiplesService.getNumbersType(i));
    }
    response.status(200).json({
        list
    });
});
router.get('/:number', function (request, response) {
    const number = parseInt(request.params.number);
    if (!number) {
        response.status(400).send('Not a number');
        return;
    }
    const value = multiplesService_1.multiplesService.getNumbersType(number);
    response.status(200).json({
        value
    });
});
exports.default = router;
