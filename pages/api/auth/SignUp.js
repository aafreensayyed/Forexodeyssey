import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
import dbConnect from '../../../utils/dbconnect';

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { email, password,phone,lastName,firstName } = req.body;
        //Validate
        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        const client = await MongoClient.connect(
            'mongodb+srv://Suraj189:Suraj123$@emaily-dev.6uxfl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        );
        const db = client.db();

        //Check existing
        const checkExisting = await db
            .collection('users')
            .findOne({ email: email });
        //Send error response if duplicate user is found
        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' });
            client.close();
            return;
        }
        //Hash password
        const status = await db.collection('users').insertOne({
            email,
            password: await hash(password, 12),
            phone,
            firstName,
            lastName,
        });
        //Send success response
        res.status(201).json({ message: 'User created', ...status });
        //Close DB connection
        client.close();
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
