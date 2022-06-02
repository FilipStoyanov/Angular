const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const routes = require("./app/routes/router.routes.js");

app.use(cors());

const db = require("./app/models/index.js");
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("Can not connect to the database!", err);
    process.exit();
  })

  //simple route
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({ parameterLimit: 1000000, limit: '50mb', extended: true}));
  app.use(express.json());


  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Service is running on port ${PORT}.`);
  })
  app.use('/api', routes)

