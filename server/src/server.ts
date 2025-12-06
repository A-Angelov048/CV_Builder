const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(
    `Express server running on port: ${PORT}. You can make requests to http://localhost:${PORT}`
  );
});
