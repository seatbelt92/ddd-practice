export class UserUpdateCommand {
    constructor(
        public id: string,
        public name: string,
    ) {}
}

export class UserRegisterCommand {
    constructor(public name: string) {}
}

export class UserGetCommand {
    constructor(public id: string) {}
}

export class UserDeleteCommand {
    constructor(public id: string) {}
}
