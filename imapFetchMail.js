const { ImapFlow } = require("imapflow");
const { serverdetails } = require("./base.js");

const main = async () => {
  const client = new ImapFlow(serverdetails);
  let return_json = [];
  await client.connect();
  let lock = await client.getMailboxLock("INBOX");
  try {
    // fetch UID for all messages in a mailbox
    /*
    "1:*" // for all messages
    "1,2,3" // for messages 1, 2 and 3
    "1,2,4:6" // for messages 1,2,4,5,6
    "*" // for the newest message
    */
    const withoutAttachment = {
      uid: true,
      flags: true,
      bodyStructure: true,
      envelope: true,
      internalDate: true,
      size: true,
      source: true,
      headers: ["From", "To", "Date", "Content-Type"],
      bodyParts: ["1"], // bodyParts are related to bodyStructure ,
    };
    const onlyAttachment = {
      uid: true,
      flags: true,
      bodyStructure: true,
      envelope: true,
      internalDate: true,
      size: true,
      source: true,
      headers: ["From", "To", "Date", "Content-Type"],
      bodyParts: ["2", "3", "4"], // bodyParts are related to bodyStructure ,
    };
    // read more here https://imapflow.com/module-imapflow-ImapFlow.html#fetch
    for await (let msg of client.fetch(
      {
        seen: true,
        or: [
          { from: "cyu@smart4solutions.nl" },
          { to: "chao.yu@talk2fast.nl" },
        ],
      }, // read more here https://imapflow.com/global.html#SearchObject
      withoutAttachment,
      { uid: true }
    )) {
      return_json.push({
        uid: msg.uid,
        envolope: msg.envelope,
        bodystructure: msg.bodyStructure["childNodes"],
        messagebody: msg.bodyParts.get("1").toString().substring(0, 256),
      });
      //console.log(`######START ${msg.uid}########################`);
      //console.log(msg.envelope);
      //console.log(msg.bodyStructure);
      //console.log(msg.bodyStructure["childNodes"]);
      //console.log(msg.headers.toString());
      //console.log(msg.bodyParts); // this return a map datatype
      //console.log(msg.bodyParts.get("1")); // this return email body as buffer
      //console.log(msg.bodyParts.get("1").toString()); // buffer to string
      //this return attachment buffer,anything above 2 are attachments , see in bodyStructure ;
      /*
      msg.bodyParts.forEach((value, key, map) => {
        if (value !== undefined) {
          if (key != 1) {
            console.log(`~~~key ${key}~~~~~~~`);
            // console.log(
            //   msg.bodyStructure["childNodes"][key - 1].type +
            //     " " +
            //     msg.bodyStructure["childNodes"][key - 1].parameters.name
            // );
          }
          //console.log(value.toString());
        }
      });
      */
      //console.log(`####END ${msg.uid}#######################`);
    }
  } finally {
    lock.release();
    // use finally{} to make sure lock is released even if exception occurs
  }
  await client.logout();
  //console.log(return_json);
  return return_json;
};

//main().catch((err) => console.error(err));

module.exports.main = main;
