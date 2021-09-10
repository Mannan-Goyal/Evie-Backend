const express = require('express');
const jwt = require('jsonwebtoken');
const Mailgun = require('mailgun-js');
const inlineCSS = require('inline-css');

const router = express.Router();
const Events = require('../models/events');
const Approved = require('../models/approved');

const verify = require('../templates/email_verify');
const { logger } = require('../logs/logger');

router.get('/calendar', async (req, res) => {
  try {
    const events = await Approved.find({});
    res.json(events);
  } catch (e) {
    res.status(500).json({ msg: `Error: ${e}` });
    logger.error('Could not fetch data from /calendar');
  }
});

router.post('/date', async (req, res) => {
  try {
    const date = new Date(req.body.date);
    const events = await Approved.find({
      $and: [
        { start: { $lte: date.setHours(23, 59, 59, 999) } },
        { end: { $gte: date.setHours(0, 0, 0, 0) } }],
    });
    res.json(events);
  } catch (e) {
    res.status(500).json({ msg: `Error: ${e}` });
    logger.error('Could not fetch data from /date');
  }
});

router.post('/month', async (req, res) => {
  try {
    const begin = new Date(req.body.begin);
    const end = new Date(req.body.end);
    const events = await Approved.find({ start: { $gte: begin, $lte: end } });
    res.json(events);
  } catch (e) {
    res.status(500).json({ msg: `Error: ${e}` });
    logger.error('Could not fetch data from /month');
  }
});

router.post('/add', async (req, res) => {
  try {
    const mailgun = new Mailgun({ apiKey: process.env.MAILAPI, domain: 'mail.csivit.com', host: 'api.eu.mailgun.net' });
    const token = jwt.sign(req.body, process.env.JWTSECRET, { expiresIn: '1d' });
    if (!token) {
      res.status(501).json({ msg: 'Invalid Token' });
      logger.error('Issue with JWT creation');
      return;
    }
    const run = async (mailTo) => {
      const template = verify(token);
      const html = await inlineCSS(template, { url: 'fake' });

      await mailgun.messages().send({
        from: 'outreach@csivit.com',
        to: mailTo,
        subject: 'Email Verification',
        html,
        text: 'HTML not enabled',
      });
    };
    await run(req.body.email).catch((e) => {
      // console.log(`Error in ${req.body.email}: ${e}`);
      logger.error(`Couldn't send mail to ${req.body.email}: ${e}`);
    });
    res.redirect(`${process.env.FRONTEND_BASEURL}/verify`);
  } catch (e) {
    // console.log(e);
    logger.error(`In route /add: ${e}`);
    res.status(500).json({ msg: `Error: ${e}` });
  }
});

router.get('/confirmation/:token', async (req, res) => {
  try {
    const data = jwt.verify(req.params.token, process.env.JWTSECRET);
    const {
      title, email, desc, start, end, img, url, org, backgroundColor, textColor,
    } = data;
    const borderColor = backgroundColor;
    await Events.create({
      title,
      email,
      desc,
      start,
      end,
      img,
      url,
      org,
      backgroundColor,
      borderColor,
      textColor,
    });
    logger.info(`Event Added ${title}`);
    res.redirect(`${process.env.FRONTEND_BASEURL}/thankyou`);
  } catch (e) {
    res.send('error');
    // console.log(e);
    logger.error(`Couldn't add event (/confirmation): ${e}`);
  }
});

module.exports = router;
