import { DataSource } from "typeorm";
import { AppDataSource } from "../src/common/datasource";
import { container, singleton } from "tsyringe";

const datasource = container.resolve(AppDataSource);

@singleton()
export class DatasourceInitalizer {
    private datasource: DataSource;
    constructor() {
        this.datasource = datasource;
    }

    async initialize(): Promise<DataSource> {
        return this.datasource.initialize();
    }
}
