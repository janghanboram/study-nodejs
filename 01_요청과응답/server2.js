const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    //res.write에서 한줄씩 작성하는 대신, html 파일을 읽어서 전송하는 방법.
    fs.readFile("./server2.html", (err, data) => {
      if (err) {
        throw err;
      }
      res.end(data);
    });
  })
  .listen(8081, () => {
    console.log("8081번 포트에서 서버 대기 중입니다!");
  });
