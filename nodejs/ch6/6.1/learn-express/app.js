const express = require("express");
const { fstat } = require("fs");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log("모든 요청에서 실행");
  next();
}),
  (req, res, next) => {
    try {
      console.log(asdkfjasflk);
    } catch (err) {
      next(err);
      //   에러 자체가 여기서 catch가 된 겁니다.
      //   next에 인수가 들어가면 error로 처리됩니다.
    }
  };
app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "./index.html"));

  //   res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  //   res.end(JSON.stringify({ hello: "Heesu" }));
  res.json({ hello: "Heesu" });
});
app.post("/", (req, res) => {
  res.send("hello express");
});
app.get("/about", (req, res) => {
  res.send("hello express");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("에러났지롱, 안 보여줄거지롱");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
// 함수가 미들웨어입니다.
// app.use 도 about에서만 실행하고 싶으면, /about을 기입하면 됩니다.

// body-parser가 뭔데요.PORT
// const morgan = require('morgan')
// app.use(morgan('dev'));
// 클라이언트에서 어떤 요청이 왔는지 서버에 기록이 된다.
// 응답하는데 몇 ms가 걸렸다.
// 성공적으로 응답했다 등등 정보가 나옵니다.PORT
// status를 404로 바꾸면 404로 나온다.

// 어떤 라우터에서 기록이 났는지 알 수 있다.

// app.use(morgan('combined'))로 하면 정확한 시간, 아이피, 브라우저까지 확인할 수 있다.
// 그래서 이건 배포할 때 사용하고,

// cookieParser = require('cookie-parser');
// cookie를 파싱하기 위해서 진행했던 복잡한 코드들이 있는데
// app.use(cookieParser())를 사용하면 req.cookieㄴ만으로 알아서 parsing된 쿠키를 받을 수 있다.

// Set-Cookie를 express에서 구현해보자면,
// res.cookie('name', encodeURIComponent(name), {
//     expires: new Date(),
//     httpOnly: true,
//     path:'/',
// })
// writeHead 대신
// res.clearCookie('name', encodeURIComponent(name), {
//     httpOnlu
// })
// 쿠키를 암호화 할 수 있습니다.Cookie를signedCookies,
// 서명화된 쿠키를 사용할 수 있습니다.Cookie를
// body-parser를 넣어야 했는데.
// app.use(express.json())과
// app.use(express.urlencoded({extended: true}))가
// bodyParser 기능이 express에 들어온 겁니다.
// http에서
// req.on ('end')
// req.on('data')를 대신해서
// req.body.name 안에 사용자 이름이 들어있는
// parsing된 작업을 할 수있는 것이다.
// req.body에서
// app.use(express.json());
// 클라이언트에서 json 데이터를 보냈을 때,
// json 데이터를 parsing해서 req.body로 넣어줍니다.Cookie

// client에서 form submit 할 때,
// 기본적으로 url encoded로, form을 parsing 한다.
// form parsing할 때 ,
// queryString을 어떻게 처리할 것인가를 나타낸 것인데,
// true면 qs로, false인 queryString보다 강력하다.
