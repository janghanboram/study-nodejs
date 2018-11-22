// 쿠키가 없으면 쿠키를 심는다
// 쿠키가 있으면 이름을 보여준다.
// 쿠키가 노출되어 있어 조작의 위험이 있음.
const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map(v => v.split("="))
    .map(([k, ...vs]) => [k, vs.join("=")])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )};Expires=${expires.toGMTString()}; HttpOnly; Path=/`
      });
      res.end();
    } else if (cookies.name) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`${cookies.name}님 안녕하세요`);
    } else {
      fs.readFile("./server4.html", (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    }
  })
  .listen(8083, () => {
    console.log("8083 포트에서 서버 대기 중입니다!");
  });
