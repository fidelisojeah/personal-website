import Mailgen from 'mailgen';
import sgMail from '@sendgrid/mail';


export const generateEmail = (name: string) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'Fidelis Ojeah Jr.',
            link: 'https://delis.xyz/'
        }
    });

    const email = {
        body: {
            name,
            signature: 'Regards',
            intro: ['Thanks again for reaching out to me', 'I\'m very excited hearing from you.'],
            action: {
                instructions: 'I can assure you that I\'ve received your email, but while you wait for my response, you can checkout my github',
                button: {
                    color: '#f15a24',
                    text: 'Github',
                    link: 'https://github.com/fidelisojeah'
                }
            },
            outro: ['You could also reach out to me via email at: fidelis.ojeah@gmail.com']
        }
    }
    const emailHTML = mailGenerator.generate(email);

    const emailText = mailGenerator.generatePlaintext(email);

    return { emailHTML, emailText }
};


export const sendMail = async ( SENDGRID_API_KEY: string, to: string, subject: string, html: string, text: string, name: string) => {
    try{
        sgMail.setApiKey(SENDGRID_API_KEY);
        const message = {
            to:{
                name,
                email: to
            },
            from: {
                name: 'Fidelis Ojeah Jr.',
                email: 'hello@delis.xyz',
            },
            subject,
            text,
            html
        };
        await sgMail.send(message);
    } catch (error){
        console.log(error);
    }
};
