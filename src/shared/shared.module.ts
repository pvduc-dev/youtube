import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    {
      provide: 'AWS_S3',
      useFactory: (configService: ConfigService) =>
        new S3({
          accessKeyId: configService.get<string>('AMAZON_S3_ACCESS_KEY_ID'),
          secretAccessKey: configService.get<string>(
            'AMAZON_S3_SECRET_ACCESS_KEY',
          ),
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
          region: 'ap-southeast-1',
        }),
      inject: [ConfigService],
    },
  ],
  exports: ['PUB_SUB', 'AWS_S3'],
})
export class SharedModule {}
