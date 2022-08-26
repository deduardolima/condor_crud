import { BannerDatabase } from "../data/BannerDatabase";
import { CustomError } from "../error/CustomError";
import { Banner } from "../model/Banner";
import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";


export class BannerBusiness {
    constructor(
        private bannerDatabase: BannerDatabase,
        private authenticator: Authenticator,
        private idGeneratator: IdGenerator
    ) { }

    public createBanner = async (banner: any, token: string) => {
        
        try {
            const { name, image, customerId, endAt, startAt, status } = banner;
            if (!name || !image || !customerId || !endAt || !startAt || !status) {
                throw new CustomError(422, " Preencha todos os campos 'name', 'image','custumerID', 'endAt' , 'startAt' e 'status'");
            }
            console.log(name)
            if (!token) {
                throw new CustomError(422, "Esse endpoint exige login")
            }
            const tokenData = this.authenticator.getTokenData(token)

            if (!tokenData) {
                throw new Error("Token inválido")
            }

            const id = this.idGeneratator.generate();




            const newBanner = new Banner(id, name, image, customerId, endAt, startAt, status)

            await this.bannerDatabase.createNewBanner(newBanner);

            return newBanner;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getAllBanner = async (token: string) => {

        try {
            if (!token) {
                throw new CustomError(422, "Esse endpoint exige login")
            }
            const tokenData = this.authenticator.getTokenData(token)
            
            if (!tokenData) {
                throw new Error("Token inválido")
            }

            const bannerFromDB = await this.bannerDatabase.getAllBanners();

            if (!bannerFromDB) {
                throw new CustomError(401, "Nenhum banner foi localizado!");
            }

            return bannerFromDB;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }

    public getBannerId = async (id: string, token: string) => {

        try {
            if (!id) {
                throw new CustomError(422, "informe o ID do banner para esse endpoint")
            }
            if (!token) {
                throw new CustomError(422, "Esse endpoint exige login")
            }
            const tokenData = this.authenticator.getTokenData(token)
            console.log(tokenData)
            if (!tokenData) {
                throw new Error("Token inválido")
            }

            const bannerById = await this.bannerDatabase.getBannerById(id);

            if (!bannerById) {
                throw new CustomError(401, "Nenhum banner foi localizado!");            }

            return bannerById;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }
}

export default new BannerBusiness(
    new BannerDatabase(),
    new Authenticator(),
    new IdGenerator()
)