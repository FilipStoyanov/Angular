const db = require("./app/models/index.js");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("Can not connect to the database!", err);
    process.exit();
  })
