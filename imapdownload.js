const { ImapFlow } = require("imapflow");
const { serverdetails } = require("./base.js");

const main = async (uid, bodyParts) => {
  const client = new ImapFlow(serverdetails);
  let bf;
  await client.connect();
  let lock = await client.getMailboxLock("INBOX");
  try {
    let response = await client.downloadMany("3", ["1", "2", "3"]);
    //process.stdout.write(response[2].content);
    //process.stdout.write(response[3].content);
    console.log(response);
    //console.log(response[3]);
    bf = await response[bodyParts].content;
  } finally {
    lock.release();
  }
  await client.logout();
  console.log(bf.toString());
  return bf;
};

main("3", "2").catch((err) => console.error(err));
module.exports.download = main;
