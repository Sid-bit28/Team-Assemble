const userModel = require('../models/user.model');
const { Webhook } = require('svix');

const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Webhook secret needed.');
  }

  const payload = req.body;
  const headers = req.headers;
  const wh = new Webhook(WEBHOOK_SECRET);
  let event;
  try {
    event = wh.verify(payload, headers);
  } catch (error) {
    res.status(400).json({
      message: 'Webhook verification failed.',
    });
  }

  // Webhooks related to creation of user.
  if (event.type === 'user.created') {
    const newUser = new userModel({
      clerkUserId: event.data.id,
      username:
        event.data.username || event.data.email_addresses[0].email_address,
      email: event.data.email_addresses[0].email_address,
      img: event.data.profile_img_url,
    });

    await newUser.save();
  }

  // Webhooks related to removal of a user.
  if (event.type === 'user.deleted') {
    const id = event.data.id;
    await userModel.deleteOne({ clerkUserId: id });
  }

  // Webhooks related to updation of user.
  if (event.type === 'user.updated') {
    await userModel.findOneAndUpdate(
      { clerkUserId: event.data.id },
      { username: event.data.username }
    );
  }

  return res.status(201).json({
    message: 'Webhook received.',
  });
};

module.exports = clerkWebHook;
