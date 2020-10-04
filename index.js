const MongoInMemory = require('mongo-in-memory');

module.exports = class MockMongo {

    constructor(options = {}) {
        this.port = options.port || 8000;
        this.mongoServer = new MongoInMemory(this.port);
    }

    async start(dbname = 'mockerdb') {
        return new Promise((resolve, reject) => {
            this.mongoServer.start((error, config) => {

                if (error) {
                    console.error(error);
                    reject(error)
                } else {
                    let mongouri = this.mongoServer.getMongouri(dbname);
                    resolve(mongouri)
                }
            });
        })
    }
    stop() {
        return new Promise((resolve, reject) => {
            this.mongoServer.stop((error) => {

                if (error) {
                    console.error(error);
                    reject(error)
                } else {
                    resolve()
                }

            })
        })
    }

}