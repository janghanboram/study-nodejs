// 세션 객체에 임임의 숫자를 함께 넘긴다.
// 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통함.
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

    const session = {};

http
  .createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      
      const randomInt = +new Date();
      session[randomInt] = {
        name,
        expires,
      }
      
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `session=${randomInt};Expires=${expires.toGMTString()}; HttpOnly; Path=/`
      });
      res.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
      fs.readFile("./server4.html", (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    }
  })
  .listen(8084, () => {
    console.log("8084 포트에서 서버 대기 중입니다!");션

  });
