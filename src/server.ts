import dotenv from "dotenv";
dotenv.config();
import server from "./app";

server.listen(process.env.PORT, () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    process.env.PORT,
    process.env.mode
  );
  console.log("  Press CTRL-C to stop\n");
});
