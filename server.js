const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8080;

const layout = fs.readFileSync(
  path.join(__dirname, "views", "layout.html"),
  "utf8",
  (err, data) => {
    if (err) {
      throw err;
    } else {
      return data;
    }
  }
);

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  function renderFile(file) {
    const dir = path.join(__dirname, "views", file);

    file === "404.html" ? (res.statusCode = 404) : 200;

    fs.readFile(dir, "utf-8", (err, content) => {
      if (err) throw err;
      const html = layout.replace("{{content}}", content);
      res.end(html);
    });
  }

  switch (req.url) {
    case "/":
      renderFile("index.html");
      break;
    case "/about":
      renderFile("about.html");
      break;
    case "/contact-me":
      renderFile("contact-me.html");
      break;
    default:
      renderFile("404.html");
  }
});

server.listen(8080, () => {
  console.log(`server listening on http://localhost:${port}`);
});
