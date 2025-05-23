import path from 'path';
import cors from 'cors';
import multer from 'multer';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response, NextFunction } from 'express';
import { PORT, COOKIE_SECRET } from "./cfg/secrets";

const app: Application = express();
app.set('port', PORT || 3000);
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
  express: app,
  watch: true,
});
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST'], // 허용할 HTTP 메서드
  allowedHeaders: ['Content-Type', 'Authorization'], // 특정 헤더만 허용
  credentials: true, // 쿠키와 같은 자격 증명 허용
}));

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../public')))
console.log('dirname :: ', __dirname);
app.use('/upload', express.static(path.join(__dirname, '../upload')))
// app.use('/call', (req: Request, res: Response, next: NextFunction) => {
//     if (true) {
//         // http://localhost:3000/call/image/cat_w_01.png
//         express.static(__dirname + '/data-code')(req, res, next);
//     } else {
//         next();
//     }
// })
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// extended: true 
// URL을 통해 전달되는 데치터에 한글, 공백 등과 같은 문자가 포함될 경우
// 제대로 인식되지 않은 문제 해결, 중복된 객체(복잡한 자료 값) 처리
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET!,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));


app.get('/', (req: Request, res: Response) => {
  res.render("index.html", { title: "Express Sample Page" });
});

// 에러 핸들링 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on :: http://localhost:${app.get('port')}`)
});