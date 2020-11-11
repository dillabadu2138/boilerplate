const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const app = express();
const port = 5000;
const config = require('./config/key');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

//
app.get('/', (req, res) => res.send('Hello World'));

// 회원가입 Route
app.post('/register', (req, res) => {
  // 회원가입시 입력한 정보들을 클라이언트에서 가져와서 데이터베이스에 넣기
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
    });
  });
});

//
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
