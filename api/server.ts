import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { UserRoute } from "./user/user.route";
import { errorHandler } from "./middleware/error.handler";
import { DatasourceInitalizer } from "./datasource.initializer";
import { container } from "tsyringe";
import { CircleRoute } from "./circle/circle.route";

async function bootstrap() {
    const app = express();
    const port = 3000;

    const datasourceInitalizer = container.resolve(DatasourceInitalizer);
    await datasourceInitalizer.initialize();

    const userRoutes = container.resolve(UserRoute);
    const circleRoutes = container.resolve(CircleRoute);

    app.use(express.json());
    app.use("/users", userRoutes.createUserRoute());
    app.use("/circles", circleRoutes.createCircleRoute());
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server running at https://localhost:${port}`);
    });
}

bootstrap().catch((err) => {
    console.error("Failed to start datasource :", err);
    process.exit(1);
});
