const connectToMongo = require("./db");
connectToMongo();
var cors = require("cors");

const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/restaurant", require("./routes/UsersRoute"));
app.use("/api/restaurant", require("./routes/RestaurantRoute"));
app.use("/api/restaurant", require("./routes/MenuRoute"));
app.use("/api/restaurant", require("./routes/DishRoute"));
app.use("/api/restaurant", require("./routes/AllergyRoute"));
app.use("/api/restaurant", require("./routes/CategoryRoute"));
app.use("/api/restaurant", require("./routes/CartaRoute"));
app.use("/api/restaurant", require("./routes/FullDataRoute"));
app.use("/api/restaurant", require("./routes/UpdateOrder"));
app.use("/api/restaurant", require("./routes/AddCategoryRoute"));

const port = 5001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
