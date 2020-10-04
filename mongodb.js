const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1/27017';
const databaseName = 'task-manager';

//! to get random id
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

//! create a database
MongoClient.connect(
    connectionURL,
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) {
            return console.log('Unable to connect');
        }

        const db = client.db(databaseName);

        //! insert call and display results
        // db.collection('users').insertOne(
        //     { name: 'Piyush', age: 20 },
        //     (error, result) => {
        //         if (error) {
        //             return console.log('Error inserting');
        //         }
        //         console.log(result.ops);
        //     }
        // );

        // db.collection('users').insertMany(
        //     [
        //         { name: 'Neha', age: 20 },
        //         { name: 'Piyush', age: 20 },
        //     ],
        //     (error, result) => {
        //         if (error) {
        //             return console.log('Error inserting');
        //         }
        //         console.log(result.ops);
        //     }
        // );

        //! fetching data from database
    }
);
