if (process.env.DEV_ENV.trim() === "true") {
  require("@babel/register")({ extensions: [".js", ".ts"] });

  require("./src/bin/server");
} else {
  console.log("production app running");
  require("./lib/bin/server");
}
