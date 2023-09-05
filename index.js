const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;


// middleware
app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_QUESTION_ID}:${process.env.DB_QUESTION_PASS}@cluster0.ngmeevb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        const booksCollection = client.db('eBookStore').collection('allBooks');
        const cartsCollection = client.db('eBookStore').collection('allCartBooks');


        app.get('/allBooks', async (req, res) => {
            const result = await booksCollection.find().toArray();
            res.send(result)
        })
        app.get('/allCartsBook', async (req, res) => {
            const result = await cartsCollection.find().toArray();
            res.send(result)
        })


        app.post('/addCarts', async (req, res) => {
            const ques = req.body;
            const result = await cartsCollection.insertOne(ques);
            res.json(result)
        })

        app.get('/allCartsBook/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cartsCollection.findOne(query)
            res.send(result)
        })

        app.delete('/allCartsBook/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cartsCollection.deleteOne(query)
            res.json(result)
        })
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Ebook is running');
})

app.listen(port, () => {
    console.log(`ebook is running on port ${port}`)
})