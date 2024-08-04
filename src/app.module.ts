import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.LOGGING_URL, {
      dbName: process.env.MONGO_DB_NAME,
      auth: {
        username: process.env.MONGO_INITDB_ROOT_USERNAME,
        password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      },
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
