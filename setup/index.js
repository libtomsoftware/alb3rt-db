const core = require('alb3rt-core'),
    api = require('../api'),
    CONFIG = core.config,
    logger = core.logger,
    FILE_ID = 'setup',
    ENV = process.env,
    dbAddress = ENV.MONGODB_ADDRESS,
    dbName = ENV.MONGODB_NAME,
    dbUser = ENV.MONGODB_USER,
    dbPassword = ENV.MONGODB_PASSWORD;

module.exports = new class Alb3rtDBSetup {
    init(mongodb) {
        if (this.hasAllDbParams()) {
            this.setupDbDetails(mongodb);
            this.testDbConnection();
        } else {
            logger.error(FILE_ID, 'Missing required DB params, aborting setup...');
        }
    }

    setupDbDetails(mongodb) {
        CONFIG.DB = Object.assign({}, CONFIG.DB, {
            CLIENT: mongodb.MongoClient,
            URL: `mongodb://${dbUser}:${dbPassword}@${dbAddress}`,
            NAME: dbName
        });
    }

    hasAllDbParams() {
        return [
            dbName,
            dbAddress,
            dbUser,
            dbPassword
        ].filter(entry => entry === undefined).length === 0;
    }

    testDbConnection() {
        logger.log(FILE_ID, 'Attempting to establish connection with db ...');

        CONFIG.DB.CLIENT.connect(`${CONFIG.DB.URL}/${CONFIG.DB.NAME}`, (error, db) => {
            if (error) {
                logger.error(FILE_ID, `Database connection error: ${error}`);
                return;
            }

            logger.info(FILE_ID, 'Connection with database established successfully.');
            db.close();
            api.init();
        });
    }
}