const core = require('alb3rt-core'),
    mongodb = require('mongodb'),
    CONFIG = core.config,
    logger = core.logger,
    FILE_ID = 'index',
    ENV = process.env,
    dbAddress = ENV.MONGODB_ADDRESS,
    dbUser = ENV.MONGODB_USER,
    dbPassword = ENV.MONGODB_PASSWORD;

module.exports = new class Alb3rtDB {
    constructor() {
        this.init();
    }

    init() {
        if (this.hasAllDbParams()) {
            this.setupDbDetails();
            this.testDbConnection();
        } else {
            logger.error(FILE_ID, 'Missing required DB params, aborting setup...');
        }
    }

    setupDbDetails() {
        CONFIG.DB = Object.assing({}, CONFIG.DB, {
            CLIENT: mongodb.MongoClient,
            URL: `mongodb://${dbUser}:${dbPassword}@${dbAddress}`
        });
    }

    hasAllDbParams() {
        return [
            dbAddress,
            dbUser,
            dbPassword
        ].filter(entry => entry === undefined).length === 0;
    }

    testDbConnection() {
        logger.log(FILE_ID, 'Attempting to establish connection with db ...');
        CONFIG.DB.CLIENT.connect(CONFIG.DB.URL, (error, db) => {
            if (error) {
                logger.error(FILE_ID, `Database connection error: ${error}`);
                return;
            }

            logger.info(FILE_ID, 'Connection with database established successfully.');
            db.close();
        });
    }
};
