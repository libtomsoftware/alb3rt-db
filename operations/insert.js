const core = require('alb3rt-core'),
  logger = core.logger,
  CONFIG = core.config,
  STATUS_CODE = CONFIG.CONSTANTS.HTTP_CODE;

module.exports = function(collectionId, data, insertionResultCallback, FILE_ID) {
    CONFIG.DB.CLIENT.connect(`${CONFIG.DB.URL}/${CONFIG.DB.NAME}`, (error, client) => {
      if (error) {
          logger.error(FILE_ID, `Database connection error: ${error}`);
          insertionResultCallback(CONFIG.CONSTANTS.HTTP_CODE.INTERNAL_SERVER_ERROR);
          return;
      }

      if (data) {
          const db = client.db(CONFIG.DB.NAME);
          const collection = db.collection(collectionId);

          collection.insert(data);
          client.close();
          insertionResultCallback(STATUS_CODE.OK);
          return;
      }
      
      insertionResultCallback(STATUS_CODE.BAD_REQUEST);
  });
};