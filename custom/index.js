const insert = require('../operations/insert'),
    core = require('alb3rt-core'),
    CONFIG = core.config,
    STATUS_CODE = CONFIG.CONSTANTS.HTTP_CODE;

module.exports = new class Alb3rtDbCustom {
    put(collectionId, data, insertionResultCallback) {
        insert(collectionId, data, insertionResultCallback, 'custom');
    }
}