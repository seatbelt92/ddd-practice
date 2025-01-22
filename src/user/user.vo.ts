export class UserId {
    constructor(public value: string) {
        if (!value) {
            throw new Error("유저아이디는 필수입니다.");
        }
    }
}

export class UserName {
    constructor(public value: string) {
        if (!value) {
            throw new Error("사용자명은 필수입니다.");
        }
        if (value.length < 2 || value.length > 10) {
            throw new Error("사용자명은 2글자 이상, 10글자 이하여야 합니다.");
        }
    }
}
