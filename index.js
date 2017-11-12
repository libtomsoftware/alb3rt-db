const core = require('alb3rt-core'),
    mongodb = require('mongodb'),
    logger = core.logger,
    FILE_ID = 'index',
    ENV = process.env;

module.exports = new class Alb3rtDB {
    constructor() {
        this.mongoClient = mongodb.MongoClient;
        this.dbUrl = `mongodb://${ENV.MONGODB_USER}:${ENV.MONGODB_PASSWORD}@${ENV.MONGODB_ADDRESS}`;
        this.testDbConnection();
    }

    testDbConnection() {
        logger.log(FILE_ID, 'Attempting to establish connection with db ...');
        this.mongoClient.connect(this.dbUrl, (error, db) => {
            if (error) {
                logger.error(FILE_ID, `Database connection error: ${error}`);
                return;
            }

            logger.info(FILE_ID, 'Connection with database established successfully.');
            db.close();
        });
    }
};
