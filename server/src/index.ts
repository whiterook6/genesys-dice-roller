import { Server } from "./server"
import path from "path";
import fs from "fs/promises";

const run = async () => {
  console.log("Loading Certificates...");
  const [
    certificate,
    key
  ] = await Promise.all([
    fs.readFile(path.join(__dirname, "../certificates/cert.pem")),
    fs.readFile(path.join(__dirname, "../certificates/key.pem"))
  ]);
  const port = 3000;

  const server = new Server();
  console.log("Starting Server...");
  await server.start(certificate, key, port);
  console.log("Server Started.");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});