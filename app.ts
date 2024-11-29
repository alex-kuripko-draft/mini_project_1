import lightKiteServer from 'light-kite';
import modules from './src/modules';
import 'dotenv/config';

const app = lightKiteServer(modules);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.run(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
