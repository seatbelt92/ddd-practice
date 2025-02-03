export class UserUpdateCommand {
    constructor(
        public id: string,
        public name: string,
        public isPremeum: boolean,
    ) {}
}

export class UserRegisterCommand {
    constructor(
        public name: string,
        public isPremeum?: boolean,
    ) {}
}

export class UserGetCommand {
    constructor(public id: string) {}
}

export class UserDeleteCommand {
    constructor(public id: string) {}
}
