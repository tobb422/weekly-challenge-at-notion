import { fetchWeeklyChallengeLogs } from './apiClient';
import { buildCharts } from './logic';

import fastify from 'fastify';
import cors from 'fastify-cors';

const server = fastify({
  logger: {
    prettyPrint: true,
  }
});

server.register(cors, {
  origin: /localhost/,
  credentials: true,
});

server.register((server, _, done) => {
  server.get('/', async (_, reply) => {
    const res = await fetchWeeklyChallengeLogs();
    const charts = res === null ? [] : buildCharts(res);

    reply
      .header('Content-Type', 'application/json')
      .code(200)
      .send({ charts });
  });

  done();
});

const start = async () => {
  try {
    await server.listen(3001);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
start();
