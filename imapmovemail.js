const { ImapFlow } = require("imapflow");
const { serverdetails } = require("./base.js");

const main = async () => {
  const client = new ImapFlow(serverdetails);
  await client.connect();
  let lock = await client.getMailboxLock("INBOX");
  try {
    let result = await client.messageMove("5", "Trash");
    console.log("Moved %s messages", result.uidMap.size);
  } finally {
    lock.release();
  }
  await client.logout();
};

main().catch((err) => console.error(err));
