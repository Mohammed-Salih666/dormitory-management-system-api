import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2'; 
import { MYSQL_CONNECTION } from '../constants';
import * as schema from './schema';

@Module({
  providers: [
    {
      provide: MYSQL_CONNECTION,
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('DATABASE_HOST');
        const user = configService.get<string>('DATABASE_USERNAME');
        const database = configService.get<string>('DATABASE_NAME');
        const password = configService.get<string>('DATABASE_PASSWORD');
        const port = configService.get<number>('DATABASE_PORT');
        
        const pool = createPool({
          host,
          user,
          database, 
          password, 
          port, 
          waitForConnections: true, 
          connectionLimit: 10,
          queueLimit: 0,
        });

        return drizzle(pool, {mode: 'default', schema})
      }
    }
  ],
  exports: [MYSQL_CONNECTION],
})
export class DatabaseModule {}
