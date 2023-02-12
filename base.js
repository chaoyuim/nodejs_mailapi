module.exports.serverdetails = {
  logger: false,
  host: process.env.MAIL_SERVER,
  port: 993,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_USER_PWD,
  },
};
