const { ImapFlow } = require("imapflow");

const { serverdetails } = require("./base.js");

const main = async () => {
  const client = new ImapFlow(serverdetails);
  await client.connect();

  let lock = await client.getMailboxLock("INBOX");
  try {
    // do something in the mailbox
    let mailbox = await client.mailboxOpen("INBOX");
    // find all unseen messages
    let list1 = await client.search({ seen: true });
    // use OR modifier (array of 2 or more search queries)
    let list2 = await client.search({
      seen: false,
      or: [
        { flagged: false },
        { from: "test@talk2fast.nl" },
        { from: "user@gmail.com" },
        { subject: "this is test message from cyu" },
      ],
    });
    console.log(list1);
    console.log(" size of list 1 => " + list1.length);
    console.log("###############################################");
    console.log(list2);
    console.log(" size of list 2 => " + list2.length);
  } finally {
    // use finally{} to make sure lock is released even if exception occurs
    lock.release();
  }
  await client.logout();
};
main().catch((err) => console.error(err));
