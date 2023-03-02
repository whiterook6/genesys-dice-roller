import { Server } from "./server"

const run = async () => {
  const server = new Server();
  return server.start(3000);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});