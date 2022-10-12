import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MySqlConfigService } from './core/typeorm/mysql.service';
import { AuthModule } from './app-modules/auth/auth.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    // Env config
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env.development' : `.env.${ENV}`,
      isGlobal: true,
    }),

    // ORM
    // TypeOrmModule.forRootAsync({
    //   useClass: MySqlConfigService,
    // }),

    // Cache
    CacheModule.register(),

    // App Modules
    AuthModule
  ],
})
export class AppModule {}
