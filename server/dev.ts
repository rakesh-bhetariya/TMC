// server/dev.ts
import express from "express";
import { registerRoutes } from "./routes.ts";
import { setupVite, log } from "./vite.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function bootstrap() {
  const server = await registerRoutes(app);

  // Dev: Vite middleware
  await setupVite(app, server);

  const port = parseInt(process.env.PORT || "5003", 10);
  server.listen(
    { port, host: "0.0.0.0" },
    () => log(`dev server on port ${port}`)
  );
}

bootstrap();
