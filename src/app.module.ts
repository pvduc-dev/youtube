import { CacheModule, Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from '@/video/video.module';
import { PubSub } from 'graphql-subscriptions';
import { SharedModule } from '@/shared/shared.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import * as redisStore from 'cache-manager-redis-store';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from '@/app.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      debug: true,
      playground: false,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        user: configService.get<string>('MONGODB_USER'),
        pass: configService.get<string>('MONGODB_PASS'),
        dbName: configService.get<string>('MONGODB_DBNAME'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    KeycloakConnectModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        authServerUrl: configService.get<string>('KEYCLOAK_URL'),
        realm: configService.get<string>('KEYCLOAK_REALM'),
        clientId: configService.get('KEYCLOAK_CLIENT_ID'),
        secret: 'secret',
        tokenValidation: TokenValidation.ONLINE,
      }),
      inject: [ConfigService],
    }),
    TerminusModule,
    HttpModule,
    VideoModule,
    SharedModule,
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  controllers: [AppController],
  exports: ['PUB_SUB'],
})
export class AppModule {}
