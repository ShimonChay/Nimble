import { Module } from "@nestjs/common";
import { databaseProviders } from "./provider.providers";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})

export class DatabaseModule {}
