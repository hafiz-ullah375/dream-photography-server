const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID } = require('bson');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_PASSWORD}@cluster0.bytxh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const photoShootServices = client.db("photoShot").collection("services");
        const reviewCollection = client.db("photoShot").collection("reviews");

        app.post('/services', async (req, res) => {
            const service = req.body;
            const result = await photoShootServices.insertOne(service)
            res.send(result);
        })

        app.get('/services', async (req, res) => {
            // const number = 3;
            const query = {};
            const cursor = photoShootServices.find(query);
            const services = await cursor.limit(3).toArray();
            res.send({
                status: true,
                message: "success",
                data: services
            })
        })

        app.get('/all-services', async (req, res) => {

            const query = {};
            const cursor = photoShootServices.find(query);
            const services = await cursor.toArray();
            res.send({
                status: true,
                message: "success",
                data: services
            })
        })

        app.get('/all-services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectID(id) };
            const serviceDetails = await photoShootServices.findOne(query);
            res.send({
                status: true,
                message: "success",
                data: serviceDetails
            })

        })

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            console.log(req.body);
            const result = await reviewCollection.insertOne(review)
            res.send(result);
        })

        app.get('/reviews', async (req, res) => {

            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send({
                status: true,
                message: "success",
                data: reviews
            })
        })

        app.get('/reviews', async (req, res) => {

            const query = {};
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send({
                status: true,
                message: "success",
                data: review
            })

        })
        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectID(id) }
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(error => console.log(error))

app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'success'
    })
})
app.listen(port, () => {
    console.log(`server is running port: ${port}`);
})