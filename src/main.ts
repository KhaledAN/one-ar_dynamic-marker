import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: { key: fs.readFileSync("certs/RootCA.key"), cert: fs.readFileSync("certs/RootCA.crt") },
  });
  console.log(fs.readFileSync("Storage/Models/1654884766071-629f8993480cadde555e2f5e.glb"));
  app.enableCors({ origin: "*" });
  await app.listen(5000);
}
bootstrap();
