import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { User } from "../user/user";

export class AppDataSource extends DataSource {
    constructor() {
        super({
            type: "mysql",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: false,
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
            entities: [User],
        });
    }
}
