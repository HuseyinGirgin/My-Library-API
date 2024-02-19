const { randomUUID } = require('crypto');

class Utils {
    static notAssigned(value) {
        return !value;
    }

    static assigned(value) {
        return !this.notAssigned(value);
    }

    static isStringEmpty(value) {
        return this.notAssigned(value) || value == '';
    }

    static isEmptyObject(value){
        return this.notAssigned(value) || Object.keys(value) <= 0;
    }

    static createUuid() {
        return randomUUID();
    }
}

module.exports = Utils;