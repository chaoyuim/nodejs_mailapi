const { ImapFlow } = require("imapflow");
const { serverdetails } = require("./base.js");

const main = async (uid, bodyParts) => {
  const client = new ImapFlow(serverdetails);
  let bf;
  await client.connect();
  let lock = await client.getMailboxLock("INBOX");
  try {
    let msg = await client.fetchOne(
      uid,
      {
        uid: true,
        bodyParts: [bodyParts],
      },
      { uid: true }
    );
    //console.log(msg.uid);
    //console.log(msg.bodyParts.get(bodyParts).toString());
    bf = msg.bodyParts.get(bodyParts);
  } finally {
    lock.release();
  }
  await client.logout();
  // console.log(bf.toString());
  return bf;
};
//main("3", "1").catch((err) => console.error(err));
module.exports.download = main;
