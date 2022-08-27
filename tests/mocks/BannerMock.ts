import { BannerInputDTO } from "../../src/model/Banner"



const name = "PlayStation 5"
const image = "https://images.kabum.com.br/produtos/fotos/238671/console-sony-playstation-5_1634132554_g.jpg"
const customerId = "0e3a0973-452b-4775-ba73-f0c33513dad0"
const endAt = "30/08/2022"
const startAt = "27/08/2022"
const status = "true"

export const dogMock: BannerInputDTO = {
    name,
    image,
    customerId,
    endAt,
    startAt,
    status
}

export const dogMock3: BannerInputDTO = {
    name,
    image,
    customerId,
    endAt:"20/08/2022",
    startAt,
    status
}