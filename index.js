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



        app.get('/services', async (req, res) => {
            // const number = 3;
            const query = {};
            const cursor = photoShootServices.find(query);
            const services = await cursor.toArray();
            res.send({
                status: true,
                message: "success",
                data: services
            })
        })

        app.get('/all-services', async (req, res) => {
            // const number = 3;
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

    }
    finally {

    }
}
run()

app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'success'
    })
})
app.listen(port, () => {
    console.log(`server is running port: ${port}`);
})