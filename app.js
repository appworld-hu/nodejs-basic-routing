const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const handleCase = (res, file, status = 200) => {
    res.writeHead(status, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/" + file + ".html").pipe(res);
  };

  switch (req.url) {
    case "/":
      handleCase(res, "index");
      break;
    case "/about":
      handleCase(res, "about");
      break;
    case "/contact":
      handleCase(res, "contact");
      break;
    default:
      handleCase(res, "404", 404);
      break;
  }
});

server.listen(
  Number(process.env.PORT) || 3000,
  process.env.HOST || "localhost",
  () => {
    console.log("Server started at localhost:3000");
  },
);
