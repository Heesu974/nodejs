const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const qs = require("querystring");
const { encode } = require("punycode");

const parseCookies = (cookie = "") =>
  cookie
    .split(";")

    .map((v) => v.split("="))

    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);

      return acc;
    }, {});

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    // cookie 문자열을 보기 쉽게 object로, {mycookie:'test'}

    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);

      const { name } = qs.parse(query);
      const expires = new Date();

      //쿠키 유효 시간을 현재시간 +5분으로 설정
      expires.setMinutes(expires.getMinutes() + 1);
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; path=/`,
      });
      res.end();
    } else if (cookies.name) {
      //name이라는 쿠키가 있는 경우,
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${cookies.name}님 안녕하세요`);
    } else {
      try {
        const data = await fs.readFile("./cookie2.html");
        res.writeHead(200, { "Content-Type": "text/html; charset-utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }
  })
  .listen(8084, () => {
    console.log("8084번 포트에서 서버 대기 중입니다.");
  });
