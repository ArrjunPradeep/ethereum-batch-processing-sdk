import { ServerApplication } from './application/server.application';

const runApplication = async (): Promise<void> => {
  const serverApplication: ServerApplication = ServerApplication.new();
  await serverApplication.run();
};

(async (): Promise<void> => {

  await runApplication();
})();
