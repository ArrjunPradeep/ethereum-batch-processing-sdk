import { ServerApplication } from './application/server.application'; // Import the ServerApplication class

// Function to run the application
const runApplication = async (): Promise<void> => {
  // Create a new instance of ServerApplication
  const serverApplication: ServerApplication = ServerApplication.new();
  // Run the server application
  await serverApplication.run();
};

// Immediately-invoked function expression (IIFE) to bootstrap the application
(async (): Promise<void> => {
  // Call the runApplication function to start the server
  await runApplication();
})();