const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const indexRouter = require('./routes/severRouter');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"]
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 100, 
//   message: "Quá nhiều yêu cầu từ IP của bạn. Vui lòng thử lại sau."
// });

// app.use(limiter);

app.use('/api', indexRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api/films/phim-moi-cap-nhat?page=1`);
  console.log(`Server is running at http://localhost:${PORT}/api/films/phim-le?page=1`);
  console.log(`Server is running at http://localhost:${PORT}/api/films/phim-bo?page=1`);
  console.log(`Server is running at http://localhost:${PORT}/api/films/hoat-hinh?page=1`);
  console.log(`Server is running at http://localhost:${PORT}/api/films/one-piece`);
});
