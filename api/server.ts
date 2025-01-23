import "dotenv/config";
import express from "express";
import { UserRoute } from "./user/user.route";
import { errorHandler } from "./middleware/error.handler";
import { DatasourceInitalizer } from "./datasource.initializer";

async function bootstrap() {
    const app = express();
    const port = 3000;

    const datasourceInitalizer = new DatasourceInitalizer();
    const datasource = await datasourceInitalizer.initialize();

    const userRoutes = new UserRoute();

    app.use(express.json());
    app.use("/users", userRoutes.createUserRoute(datasource));
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server running at https://localhost:${port}`);
    });
}

bootstrap().catch((err) => {
    console.error("Failed to start datasource :", err);
    process.exit(1);
});
