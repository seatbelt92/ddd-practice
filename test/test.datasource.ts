import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { User } from "../src/user/user";
import { Circle } from "../src/circle/circle";

export class TestDataSource extends DataSource {
    constructor() {
        super({
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            logging: false,
            dropSchema: true,
            namingStrategy: new SnakeNamingStrategy(),
            entities: [User, Circle],
        });
    }
}
