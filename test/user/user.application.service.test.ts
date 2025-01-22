import { DataSource } from "typeorm";
import { TestDataSource } from "../test.datasource";
import { UserRepository } from "../../src/user/user.repository";
import { UserService } from "../../src/user/user.service";
import { UserApplicationService } from "../../src/user/user.application.service";
import { UserTORepository } from "../../src/user/user.to.repository";
import { AlreadyExistError, ResourceNotFoundError } from "../../src/common/base.error";
import {
    UserDeleteCommand,
    UserGetCommand,
    UserRegisterCommand,
    UserUpdateCommand,
} from "../../src/user/user.command";

describe("UserApplicationService", () => {
    let datasource: DataSource;
    let userRepository: UserRepository;
    let userService: UserService;
    let userAppService: UserApplicationService;

    beforeEach(async () => {
        datasource = await new TestDataSource().initialize();
        userRepository = new UserTORepository(datasource);
        userService = new UserService(userRepository);
        userAppService = new UserApplicationService(userService, userRepository);
    });

    afterEach(async () => {
        if (datasource.isInitialized) {
            await datasource.destroy();
        }
    });

    test("register a new user", async () => {
        const userName = "testUser";
        const user = await userAppService.registerUser(new UserRegisterCommand(userName));

        expect(user).toBeDefined();
        expect(user.userName.value).toBe(userName);
    });

    test("throw an error when registering a user with an existing name", async () => {
        const userName = "testUser";
        await userAppService.registerUser(new UserRegisterCommand(userName));

        await expect(
            userAppService.registerUser(new UserRegisterCommand(userName)),
        ).rejects.toThrow(AlreadyExistError);
    });

    test("update an existing user's name", async () => {
        const userName = "oldName";
        const user = await userAppService.registerUser(new UserRegisterCommand(userName));

        const updatedName = "newName";
        const updatedUser = await userAppService.updateUser(
            new UserUpdateCommand(user.userId.value, updatedName),
        );

        expect(updatedUser.userName.value).toBe(updatedName);
    });

    test("throw an error when updating a non-existent user", async () => {
        const nonExistentId = "non-existent-id";
        await expect(
            userAppService.updateUser(new UserUpdateCommand(nonExistentId, "newName")),
        ).rejects.toThrow(ResourceNotFoundError);
    });

    test("throw an error when updating to a name that already exists", async () => {
        await userAppService.registerUser(new UserRegisterCommand("user1"));
        const user2 = await userAppService.registerUser(new UserRegisterCommand("user2"));

        await expect(
            userAppService.updateUser(new UserUpdateCommand(user2.userId.value, "user1")),
        ).rejects.toThrow(AlreadyExistError);
    });

    test("get a user by id", async () => {
        const userName = "testUser1";
        const user = await userAppService.registerUser(new UserRegisterCommand(userName));

        const savedUser = await userAppService.getUser(new UserGetCommand(user.userId.value));

        expect(savedUser.userId.value).toBe(user.userId.value);
        expect(savedUser.userName.value).toBe(userName);
    });

    test("throw an error when getting a user by non-existent id", async () => {
        const nonExistentId = "non-existent-id";
        await expect(userAppService.getUser(new UserGetCommand(nonExistentId))).rejects.toThrow(
            ResourceNotFoundError,
        );
    });

    test("get all users", async () => {
        await userAppService.registerUser(new UserRegisterCommand("user1"));
        await userAppService.registerUser(new UserRegisterCommand("user2"));

        const users = await userAppService.getUsers();

        expect(users).toHaveLength(2);
        expect(users.map((u) => u.userName.value)).toEqual(
            expect.arrayContaining(["user1", "user2"]),
        );
    });

    test("delete a user", async () => {
        const user = await userAppService.registerUser(new UserRegisterCommand("testUser"));
        const deletedUser = await userAppService.deleteUser(
            new UserDeleteCommand(user.userId.value),
        );

        expect(deletedUser.userId.value).toBe(user.userId.value);
        await expect(userRepository.findById(user.userId)).resolves.toBeNull();
    });

    test("throw an error when deleting a non-existent user", async () => {
        const nonExistentId = "non-existent-id";
        await expect(
            userAppService.deleteUser(new UserDeleteCommand(nonExistentId)),
        ).rejects.toThrow(ResourceNotFoundError);
    });
});
