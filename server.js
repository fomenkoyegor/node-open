const express = require('express');
const app = express();
const path = require('path');
const key = require('./config/key');
const port = process.env.PORT || key.port;
const mongoose = require('mongoose');
const mongoURL = key.mongoURL;
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const nodemailer = require('nodemailer');

const mongoDB = mongoose.connect(
    mongoURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
);
mongoDB.then(() => {
    console.log('connected mongoDB');
}).catch((err) => {
    console.log('err', err);
});

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const {
    authRoute,
    postsRoute,
    commentsRoute
} = require('./routes');

app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/comments', commentsRoute);

app.post('/api/contact', async (req, res) => {
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fomenkoyegor@gmail.com',
            pass: 'zcnht,2020'
        }
    });
    let {message,userEmail,subject,text} = req.body;

    let output = `<p>${message}</p>`;


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: userEmail, // sender address
        to: '252104356@etlgr.com', // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: output // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.status(201).json({
        message:'email send',
        body:output
    })
});

app.get('/api/test', (req, res) => res.json({'test': 'test'}));

app.use(express.static('public'));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));


app.listen(port, async () => console.log(`server run on port http://localhost:${port}`));


