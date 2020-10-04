const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1/27017';
const databaseName = 'task-manager';

MongoClient.connect(
    connectionURL,
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) {
            return console.log('Unable to connect');
        }

        const db = client.db(databaseName);
        db.collection('users').insertOne(
            { name: 'Piyush', age: 20 },
            (error, result) => {
                if (error) {
                    return console.log('Error inserting');
                }

                console.log(result.ops);
            }
        );
    }
);
