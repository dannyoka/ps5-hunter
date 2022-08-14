const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const sendAlert = async (url) => {
  const message = await client.messages.create({
    body: `There is a PS5 in stock. Visit ${url}`,
    from: process.env.PHONE_NUMBER,
    to: "+16023399657",
  });
  console.log(`Message: ${message.sid} sent successfully`);
};

module.exports = { sendAlert };
