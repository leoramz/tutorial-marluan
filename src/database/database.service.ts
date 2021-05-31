import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "../config/config.service";
import { ConfigModule } from "../config/config.module";
import { Configuration } from "../config/config.keys";
import { ConnectionOptions } from "typeorm";

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
          return {
            type: 'mysql',
            host: config.get(Configuration.HOST),
            username: config.get(Configuration.USERNAME),
            port: 3306,
            database: config.get(Configuration.DATABASE),
            password: config.get(Configuration.PASSWORD),
            entities: ['dist/**/**/*.entity{.ts,.js}'],
            synchronize: true
          } as ConnectionOptions;
        },
    }),
]

//POSTGRE 603555e3c5d49046c06d8d3773de1ee7bb1bb1db1bb244e67fba8b042468c60e 