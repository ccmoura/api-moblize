import 'dotenv/config';
import app from './app';

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT || 3000}`);
  console.log(`ENV: ${process.env.NODE_ENV}`);
});

export default server;
