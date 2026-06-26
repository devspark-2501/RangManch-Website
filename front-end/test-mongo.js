const mongoose = require("mongoose");
// moongose connection testing file!

mongoose
  .connect(
    "mongodb+srv://devspark2501_db_user:Tanush2501@rangmanchcluster.6q8yvy0.mongodb.net/rangmanch?retryWrites=true&w=majority&appName=RangManchCluster"
  )
  .then(() => {
    console.log("CONNECTED");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
