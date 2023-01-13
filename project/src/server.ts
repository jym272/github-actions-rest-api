import { initializeSetup, startSetup } from './setup';
import { connectMongodb } from '@db/index';
import { getEnv, successConnectionMsg } from '@utils/index';
import serverless from 'serverless-http';

const { server } = initializeSetup();

const PORT = getEnv('PORT');
// silly comment
void (async () => {
  try {
    startSetup(server);
    await connectMongodb();
    server.listen(PORT, () =>
      successConnectionMsg(`${String.fromCodePoint(0x1f680)} Server is running on port ${PORT}`)
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    process.exitCode = 1;
  }
})();

export const express = serverless(server);
