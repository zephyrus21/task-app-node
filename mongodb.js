const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const databaseName = 'task-manager'

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) return console.log('Unable to connect')

    const db = client.db(databaseName)

    //! Insert one document into a collection
    // db.collection('users').insertOne({ name: 'Piyush Pandey', age: 22 }, (err, res) => {
    //     if (err) return console.log('Unable to insert')
    //     console.log(res.ops);
    // })

    //! Insert many document into a collection
    // db.collection('users').insertMany([
    //     { name: 'Neha', age: 19 },
    //     { name: 'Billu', age: 32 }
    // ], (err, res) => {
    //     if (err) return console.log('Unable to insert')
    //     console.log(res.ops)
    // })

    //! Read document from a collection
    // db.collection('users').findOne({ name: 'Tillu' }).then((res) => console.log(res)).catch((err) => console.log(err))

    //! Update document in a collection
    // db.collection('users').updateOne({ name: 'Billu' }, { $set: { name: 'Tillu' } }).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })
})