MockMongo
=========

A library for mocking a MongoDb Instance in memory. 


#### Testing Mocha
Starts up a mongodb instance in a promise based approach allowing the call to be awaited. User can specify the name of the database the full connection string will be returned

```javascript
import MockMongo from 'mockable-mongo'
import Mongoose from 'mongoose'

describe('Testing with Mocha', () => {
    
    describe('Mongoose Connection', () => {
        const MONGO_SERVER = new MockMongo()
        
        mongoose.set("useNewUrlParser", true);
        mongoose.set("useFindAndModify", false);
        mongoose.set("useCreateIndex", true);
        mongoose.set("useUnifiedTopology", true);

        before(async done => {
            const CONNECTION_STRING = await MONGO_SERVER.start('myDb')
            await mongoose.connect(CONNECTION_STRING)
            done()
        })
        
        after(async done => {
            await mongoose.disconnect()
            await MONGO_SERVER.stop()
            done()
        })
    })
})

```

#### Testing with Ava
With ava be sure to spin up and teardown the db in each file as all tests are run in isolated worker environments

```javascript
import ava from 'ava'
import MockMongo from 'mockable-mongo'
import Mongoose from 'mongoose'

const MONGO_SERVER = new MockMongo()

ava.before('Setup DB', async t => {
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    const CONNECTION_STRING = await MONGO_SERVER.start('myDb')
    await mongoose.connect(CONNECTION_STRING)
});

//#region SUT TESTS
//#endregion

ava.after("Teardown", async t => {
    await mongoose.disconnect()
    await MONGO_SERVER.stop()
})

```
