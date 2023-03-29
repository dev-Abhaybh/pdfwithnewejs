const app = require("./app");
const PORT = 8004;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT,
      __dirname
    );
  else console.log("Error occurred, server can't start", error);
});
