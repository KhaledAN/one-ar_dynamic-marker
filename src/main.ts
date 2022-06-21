import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: { key: fs.readFileSync("certs/RootCA.key"), cert: fs.readFileSync("certs/RootCA.crt") },
  });
  app.enableCors({ origin: "*" });
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
