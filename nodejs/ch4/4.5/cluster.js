const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  //CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  //워커가 종료되었을때,
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log("code", code, "signal", signal);
    // cluster.fork();
  });
} else {
  //워커들이 포트에서 대기
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>Hello Node!</h1>");
      res.end("<p>Hello Cluster</p>");
      setTimeout(() => {
        //워커 존재를 확인하기 위해 1초마다 강제 종료
        process.exit(1);
      }, 1000);
    })
    .listen(8086);
}
// process.exit() > 서버가 꺼진다 = 노드 프로세스가 꺼진다. = 프로그램이 꺼진다.
// 프로세스 아이디는
// 마스터 프로세스 하나에
// 워커 프로세스 6개
// 워커 프로세스가 워커 "서버"이다.cluster

// cluster.fork()하면 새로운 워커 프로세스가 생성된다.
