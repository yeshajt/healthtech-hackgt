const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (name, email) => {
    sgMail.send({
        to: email,
        from: 'ninaadlak@gmail.com',
        subject: 'Thanks for joining!',
        text: 'Welcome to the app, ' + name + '. Let me know how you get along with the app.'
    })
}

const sendCancellationEmail = (name, email) => {
    sgMail.send({
        to: email,
        from: 'ninaadlak@gmail.com',
        subject: 'Account Deletion',
        text: "So sad to see you go " + name + "! Let us know why you cancelled here."
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
