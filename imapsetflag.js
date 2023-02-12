const { ImapFlow } = require("imapflow");
const { serverdetails } = require("./base.js");

const main = async () => {
  const client = new ImapFlow(serverdetails);
  await client.connect();
  let lock = await client.getMailboxLock("INBOX");
  try {
    await client.messageFlagsAdd("4", ["Seen"]);
  } finally {
    lock.release();
  }
  await client.logout();
};

main().catch((err) => console.error(err));
