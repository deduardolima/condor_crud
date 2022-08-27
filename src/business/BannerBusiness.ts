import { BannerDatabase } from "../data/BannerDatabase";
import { CustomError } from "../error/CustomError";
import { Banner, BannerChangeInputDTO } from "../model/Banner";
import Authenticator from "../services/Authenticator";
import Filter from "../services/Filter";
import IdGenerator from "../services/IdGenerator";


export class BannerBusiness {
    constructor(
        private bannerDatabase: BannerDatabase,
        private authenticator: Authenticator,
        private idGeneratator: IdGenerator,
        private filter: Filter
    ) { }

    public createBanner = async (banner: any, token: string) => {

        try {
            const { name, image, customerId, endAt, startAt, status } = banner;
            if (!name || !image || !customerId || !endAt || !startAt || !status) {
                throw new CustomError(422, "Preencha todos os campos 'name', 'image','custumerID', 'endAt' , 'startAt' e 'status'");
            }
            if (!token) {
                throw new CustomError(422, "Esse endpoint exige login")
            }
            const tokenData = this.authenticator.getTokenData(token)

            if (!tokenData) {
                throw new CustomError(409, "Token inválido")
            }

            if (endAt < startAt) {
                throw new CustomError(409, "Data final é menor que data de ínicio")
            }

            const filterDate = this.filter.calculate(startAt)

            if (filterDate === false) {
                throw new CustomError(409, "Data de ínicio é inválida")
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

            if (bannerFromDB.length < 1) {
                throw new CustomError(404, "Nenhum banner foi localizado!");
            }


            return bannerFromDB;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }

    public getBannerId = async (token: string, id: string) => {

        try {
            if (!token) {
                throw new CustomError(422, "Esse endpoint exige login")
            }
            const tokenData = this.authenticator.getTokenData(token)

            if (!tokenData) {
                throw new Error("Token inválido")
            }
            if (!id) {
                throw new CustomError(422, "informe o ID do banner para esse endpoint")
            }

            const bannerById = await this.bannerDatabase.getBannerById(id);

            if (!bannerById) {
                throw new CustomError(404, "Não foi possivel encontrar o banner");
            }

            return bannerById;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }
    public changeBanner = async (banner: BannerChangeInputDTO, token: string) => {

        try {

            const { id, name, image, status } = banner;
            if (!id || !name || !image) {
                throw new CustomError(422, "Verifique se todos os campos estão preenchidos");
            }
            if (!token) {
                throw new CustomError(422, "Esse endpoint exige login")
            }
            const tokenData = this.authenticator.getTokenData(token)

            if (!tokenData) {
                throw new Error("Token inválido")
            }

            const changeBanner = new Banner(id, name, image, status)

            await this.bannerDatabase.updateBannerById(changeBanner)

            const message = "Banner alterado com sucesso"

            return message

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }
    public deleteBanner = async (token: string, id: string) => {

        try {
            if (!token) {
                throw new CustomError(422, "Esse endpoint exige login")
            }
            const tokenData = this.authenticator.getTokenData(token)

            if (!tokenData) {
                throw new Error("Token inválido")
            }
            if (!id) {
                throw new CustomError(422, "informe o ID do banner para esse endpoint")
            }

            await this.bannerDatabase.deleteBannerById(id)

            const message = "Banner deletado com sucesso"

            return message


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }
    }
}

export default new BannerBusiness(
    new BannerDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new Filter()
)