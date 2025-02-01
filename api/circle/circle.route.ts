import { Router } from "express";
import { constants } from "http2";
import { CircleApplicationService } from "../../src/circle/circle.application.service";
import { container, singleton } from "tsyringe";
import { CircleCreateCommand, CircleJoinCommand } from "../../src/circle/circle.command";

@singleton()
export class CircleRoute {
    createCircleRoute(): Router {
        const circleRoutes = Router();
        const circleAppService = container.resolve(CircleApplicationService);

        circleRoutes.post("/", async (req, res, next) => {
            try {
                const { userId, name } = req.body;
                const command = new CircleCreateCommand(userId, name);
                const circle = await circleAppService.createCircle(command);
                res.status(constants.HTTP_STATUS_CREATED).json(circle);
            } catch (err) {
                next(err);
            }
        });

        circleRoutes.put("/:id", async (req, res, next) => {
            try {
                const { id } = req.params;
                const { userId } = req.query;
                const command = new CircleJoinCommand(Number(id), String(userId));
                const circle = await circleAppService.joinCircle(command);
                res.status(constants.HTTP_STATUS_OK).json(circle);
            } catch (err) {
                next(err);
            }
        });

        return circleRoutes;
    }
}
