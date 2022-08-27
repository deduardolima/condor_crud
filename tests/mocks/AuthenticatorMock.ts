

interface AuthenticationData {
    id: string;
    email: string;
}


export class AuthenticatorMock {
    public generate = (input: AuthenticationData): string => {
        return "token"
    }

    public verify(token: string) {
        return {
            id: "id_mock"
        }
    }
}