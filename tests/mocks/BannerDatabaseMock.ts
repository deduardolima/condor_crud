import { Banner } from "../../src/model/Banner";


const resultado = {
    id: "0f933495-b854-495b-82e4-10cfde9dd80e",
    name: "PlayStation 5",
    image: "https://images.kabum.com.br/produtos/fotos/238671/console-sony-playstation-5_1634132554_g.jpg",
    customerId: "0e3a0973-452b-4775-ba73-f0c33513dad0",
    endAt: "30/08/2022",
    startAt: "27/08/2022",
    status: 1
}
const resultado2: any[] = []
const banner_id = "0f933495-b854-495b-82e4-10cfde9dd80e"
const message = "Banner alterado com sucesso"
export class BannerDatabaseMock {
    public async createNewBanner(banner: Banner): Promise<void> {

    }
    public async getBannerById(id: string): Promise<Banner> {

        if (id === banner_id) {
            return Banner.toBannerModel(resultado)
        } else {
            return Banner.toBannerModel(resultado2)
        }
    }
    public async updateBannerById(banner: Banner): Promise<string> {
        if (banner.getId() === banner_id) {
            return message
        } else {
            return "Não foi possivel encontrar o banner"
        }
    }
    public async deleteBannerById(id: string): Promise<string> {
        if (id === banner_id) {
            return message
        } else {
            return "Não foi possivel encontrar o banner"
        }
    }
}