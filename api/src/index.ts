import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server started at port 3000');
});
