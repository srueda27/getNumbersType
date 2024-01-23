"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiplesService = void 0;
class Service {
    getNumbersType(number) {
        let result = '';
        number % 3 == 0 && (result += 'Type 1');
        number % 5 == 0 && (result += 'Type 2');
        if (result == 'Type 1Type 2')
            result = 'Type 3';
        return result || number.toString();
    }
}
exports.multiplesService = new Service();
