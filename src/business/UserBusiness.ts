import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import IdGenerator from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";
import { CustomError } from "../error/CustomError";


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private idGeneratator: IdGenerator
    ) { }

    public createUser = async (user: UserInputDTO) => {

        try {
            const { email, password, name, phone } = user;
            if (!email || !password || !name || !phone) {
                throw new CustomError(422, " Preencha todos os campos 'name', 'email' , 'phone' e 'password'");
            }
            if (email.indexOf("@") === -1) {
                throw new CustomError(422, "Email inválido");
            }
            if (password.length < 6) {
                throw new CustomError(422, "Senha deve ter pelo menos 6 caracteres");
            }

            const userFromDB = await this.userDatabase.getUserByEmail(email);
            if (userFromDB) {
                throw new CustomError(409, "Email já cadastrado");
            }

            const id = this.idGeneratator.generate();

            const hashPassword = await this.hashManager.hash(password);

            const newUser = new User(id, name, email, phone, hashPassword)

            await this.userDatabase.createUser(newUser);

            const accessToken = this.authenticator.generateToken({ id, email });

            return accessToken;

        } catch (error: any) {
            if (error.message.includes("key 'email'")) {
                throw new CustomError(409, "Email já esta em uso")
            }
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public login = async (user: LoginInputDTO) => {

        try {
            const { email, password } = user

            if (!email || !password) {
                throw new CustomError(422, "Senha ou Email inválido!")

            }
            const userFromDB = await this.userDatabase.getUserByEmail(email);

            if (!userFromDB) {
                throw new CustomError(401, "Email não cadastrado");
            }

            const hashCompare = await this.hashManager.compare(password, userFromDB.getPassword());

            if (!hashCompare) {
                throw new CustomError(401, "Senha inválida");
            }

            const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), email: userFromDB.getEmail() });

            return accessToken;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }
}

export default new UserBusiness(
    new UserDatabase(),
    new Authenticator(),
    new HashManager(),
    new IdGenerator()
)