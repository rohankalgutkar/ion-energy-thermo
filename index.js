const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const Temps = require("./models/thermomemter");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post("/load-data/", (req, res, next) => {
  console.log("Received Data...", req.body);
});

app.get("/fetch-data/", (req, res, next) => {

  Temps.aggregate(
    [
      {
        $match: {
          ts: {
            $gte: 1424515163000,
            $lte: 1451606400000
          }
        }
      }, {
        $addFields: {
          strTS: { $toString: "$ts" },
        }
      },
      // {
      //   $limit: 1000
      // },
      {
        $group: {
          _id: {
            "$week": {
              "$add": [
                new Date(0),
                { "$multiply": [1000, "$ts"] }
              ]
            }
          },
          average: { $avg: "$val" }
        }
      }
    ],
    function (err, result) {
      if (err) {
        next(err);
      } else {
        console.log("fetched ", result.length);
        res.json(result);
      }
    }
  );

  console.log("Sending Data...");
});

mongoose
  .connect("mongodb://localhost:27017/thermo", { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
