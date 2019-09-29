import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

import { generateEmail, sendMail } from './email';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



const API_KEY = functions.config().webfunction && functions.config().webfunction.sendgridkey;

export const sendEmail = functions.firestore.document('messages/{message}').onWrite(async (change, context) => {
    const messageObject = change.after.data();
    if (messageObject) {
        const emailAddress = messageObject.email;
        const name = messageObject.name;

        const { emailHTML, emailText } = generateEmail(name);
        try {
            await sendMail(API_KEY, emailAddress, 'Thanks for Reaching Out!', emailHTML, emailText);
            // mail to me
            await sendMail(API_KEY, 'fidelis.ojeah@gmail.com', 'A new Contact has been made.', 'Check firebase storage', 'Check firebase storage');
        } catch (error) {
            console.log(error);
        }
    }

});

