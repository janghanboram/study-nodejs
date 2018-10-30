const http = require('http');

http.createServer((req,res)=>{
    res.write('<h1>Hello World!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(8080, ()=>{ //클라이언트에게 공개할 port, 연결 완료 후 실행될 콜백 함수.
    console.log('8080번 포트에서 서버 대기 중입니다!');
})