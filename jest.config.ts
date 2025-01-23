import type { Config } from "jest";

export default async (): Promise<Config> => {
    return {
        preset: "ts-jest",
        testEnvironment: "node",
        transform: {
            "^.+\\.ts?$": "ts-jest",
        },
        testPathIgnorePatterns: ["<rootDir>/dist/"],
        transformIgnorePatterns: ["<rootDir>/node_modules/"],
    };
};
