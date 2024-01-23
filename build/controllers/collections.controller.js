"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getCollection = exports.saveNumber = exports.collections = void 0;
const multiplesService_1 = require("../services/multiplesService");
exports.collections = {};
const saveNumber = (request, response) => {
    if (typeof request.body.collectionName !== 'string') {
        response.status(400).send('Not a valid string for collectionName');
        return;
    }
    if (typeof request.body.number !== 'number') {
        response.status(400).send('Not a number');
        return;
    }
    const collectionName = request.body.collectionName;
    const number = parseInt(request.body.number);
    const collectionID = collectionName.toLowerCase();
    if (!exports.collections[collectionID])
        exports.collections[collectionID] = { collectionName: collectionName, numbers: [] };
    const itemsExists = exports.collections[collectionID].numbers.some(item => item.value == number);
    if (itemsExists) {
        response.status(409).send(`The number ${number} already exists in '${collectionName}'`);
        return;
    }
    exports.collections[collectionID].collectionName = collectionName;
    exports.collections[collectionID].numbers.push({ value: number, type: multiplesService_1.multiplesService.getNumbersType(number) });
    exports.collections[collectionID].numbers.sort((a, b) => a.value - b.value);
    response.status(200).send(`The number ${number} was succesfully saved in the collection '${collectionName}'`);
};
exports.saveNumber = saveNumber;
const getCollection = (request, response) => {
    var _a;
    const collectionName = request.params.collectionName;
    response.status(200).json({
        collection: ((_a = exports.collections[collectionName.toLowerCase()]) === null || _a === void 0 ? void 0 : _a.numbers) || []
    });
};
exports.getCollection = getCollection;
const getAll = (request, response) => {
    const keys = Object.keys(exports.collections);
    let results = {};
    for (let i = 0; i < keys.length; i++) {
        const collectionID = keys[i];
        const collectionName = exports.collections[collectionID].collectionName;
        results[collectionName] = exports.collections[collectionID].numbers;
    }
    response.status(200).json({
        collections: results
    });
};
exports.getAll = getAll;
