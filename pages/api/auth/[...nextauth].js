import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';

export default NextAuth({
    //Configure JWT
    session: {
        jwt: true,
    },
    //Specify Provider
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                //Connect to DB
                const client = await MongoClient.connect(
                    'mongodb+srv://Suraj189:Suraj123$@emaily-dev.6uxfl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
                );
                const db = client.db();
                //Get all the users
                const users = await db.collection('users');
                //Find user with the email
                const result = await users.findOne({
                    email: credentials.email,
                });

                    console.log("other result", credentials.password)
                //Not found - send error res
                if (!result) {
                    client.close();
                    throw new Error('No user found with the email');
                }
                //Check hased password with DB password
                const checkPassword = await compare(credentials.password, result.password);
                //Incorrect password - send response
                if (!checkPassword) {
                    client.close();
                    throw new Error('Password doesnt match');
                }
                //Else send success response
                client.close();
                return { email: result.email };
            },
        }),
    ],
});