const express = require("express");
const fetchall = require("./imapFetchMail.js");
const fetch1 = require("./imapfetchone");

const app = express();

const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth === process.env.API_AUTH) {
    next();
  } else {
    res.status(401);
    res.send("Access forbidden");
  }
};

app.get("/newmails", isAuth, async (req, res) => {
  const lists = await fetchall.main();
  res.json(lists);
});
app.get("/downloadmail", isAuth, async (req, res) => {
  let uid = req.headers.uid;
  let bodypart = req.headers.bodypart;
  let contentType = req.headers.type;
  let filename = req.headers.filename;
  const base64Data = await fetch1.download(uid, bodypart);
  //var decodedStringAtoB = atob("data:image/gif;base64," + base64Data);
  // res.set("Content-Type", contentType);
  //res.set("Content-Disposition", `attachment; filename=${filename}`);
  // res.setHeader("Content-Length", base64Data.length);
  res.send(base64Data);
  res.end();
});

app.listen(5000, () => {
  console.log("listening on part 5000");
});
