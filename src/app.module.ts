import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { configModule } from './configure.root';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    configModule,

    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Maria:12345@cluster0.sdz7m.mongodb.net/test?retryWrites=true&w=majority',
    ),
    TokenModule,
    EventsModule,
    FileModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
