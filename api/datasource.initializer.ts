import { DataSource } from "typeorm";
import { AppDataSource } from "../src/common/datasource";

export class DatasourceInitalizer {
    private datasource: DataSource;
    constructor() {
        this.datasource = new AppDataSource();
    }

    async initialize(): Promise<DataSource> {
        return this.datasource.initialize();
    }
}
