const express = require('express');
const router = express.Router();

// for sending email
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// @ route    POST /contact
// @desc      Message, Feedback from Contact From to me
// @access    Public
router.post('/contact', async (req, res) => {
  const oauth2Client = new OAuth2(
    '358841918790-u1tgolts9icbm1ri3rk80974smm753kr.apps.googleusercontent.com',
    'tVtSBLfdm5tD55fRWrYqwiSO',
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: '1/ZzF-jO6TYQvXbDu3dv_DYrNkYbsaSEatzEx2oER6beA'
  });

  const tokens = await oauth2Client.refreshAccessToken();

  const accessToken = tokens.credentials.access_token;

  let smtptransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'orenooteam@gmail.com',
      clientId:
        '7091481724-36ovff11llhsqlg1cg52fo9mhdil0n21.apps.googleusercontent.com',
      clientSecret: 'A94RsQ-1F1x4vJBKHwcTfVrM',
      refreshToken: '1/ZzF-jO6TYQvXbDu3dv_DYrNkYbsaSEatzEx2oER6beA',
      accessToken: accessToken
    }
  });

  const output = `
  <p>You have a new contact from Orenoo</p>
  <h1>Contact from Orenoo</h1>

  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  
</ul>
<h2>message</h2>
<p>Message: ${req.body.message}</p>
  `;

  let mailOptions = {
    from: "'Orenoo' <orenooteam@gmail.com>",
    to: 'kittichoteshane@gmail.com',
    subject: "Message from Orenoo's Contact Form",
    text: 'Hello World',
    html: output
  };

  smtptransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    res.render('contact', { msg: 'Email has been sent' });
  });
});

// @ route    POST /welcome
// @desc      Send a welcome email to new users
// @access    Public

router.post('/welcome', async (req, res) => {
  console.log('_________________________________');
  console.log(req.body);
  const oauth2Client = new OAuth2(
    '358841918790-u1tgolts9icbm1ri3rk80974smm753kr.apps.googleusercontent.com',
    'tVtSBLfdm5tD55fRWrYqwiSO',
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token:
      '1/Klne0feOpsWxYKP5_VFR5DucirfMo34iMZTu43H5IXlZSIcruyoEUPRTo9u2A7t_'
  });

  const tokens = await oauth2Client.refreshAccessToken();

  const accessToken = tokens.credentials.access_token;

  let smtptransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'orenooteam@gmail.com',
      clientId:
        '7091481724-36ovff11llhsqlg1cg52fo9mhdil0n21.apps.googleusercontent.com',
      clientSecret: 'A94RsQ-1F1x4vJBKHwcTfVrM',
      refreshToken: '1/aOBla2WKltIv7XDscXaq2hANWyM-yG0LBgXEEQdxw6o',
      accessToken: accessToken
    }
  });

  const output = `
    <div style={background-color: #fff; margin: 4rem auto; }">
    <div style={text-align:center; margin:2rem auto; }>

    <h1 style={color: #00c58e }>Welcome to Orenoo</h1>
  
    <p>Thank you for registration</p>
    <p>We hope you enjoy orenoo.
    We are trying to make a language learning experience to be as fun and easy as possible</p>

    <p>We are still in a beta version.
    Therefore, please feel free to let us know if there are feedback for the app.</p>

  </div>
  </div>
    `;

  let mailOptions = {
    from: "'Orenoo' <orenooteam@gmail.com>",
    to: req.body.email,
    subject: 'Welcome to Orenoo',
    text: 'Hello World',
    html: output
  };

  smtptransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.send({ msg: 'Thank you for your message.' });
  });
});

module.exports = router;
