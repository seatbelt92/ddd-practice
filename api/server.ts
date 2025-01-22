import "dotenv/config";
import express from "express";
import userRoutes from "./user/user.route";
import { errorHandler } from "./middleware/error.handler";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});
