import configure from './index';
import * as express from 'express';

async function bootstrap() {
  const app = express();
  const nest = await configure({ app, prefix: 'api' });
  await nest.listen(3000);
}

bootstrap();
