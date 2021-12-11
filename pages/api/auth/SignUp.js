import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
import dbConnect from '../../../utils/dbconnect';
const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);


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
        //Logic for sending email
        const message = `
            Name: ${firstName}\r\n
            Email: ${email}\r\n
            Message: 'Welcome to forexodeyssey
            `;
      
        const data = {
            to: email,
            from: 'suraj84467@gmail.com',
            subject: `New message from forexodeyssey`,
            text: message,
            html: message.replace(/\r\n/g, '<br />'),
          };
          mail
          .send(data)
          .then((res) => {console.log('mailSend',res)})
          .catch((err)=>{console.log('err',err)})

            //Close DB connection
        client.close();
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
