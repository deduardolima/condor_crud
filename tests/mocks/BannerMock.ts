import { Banner, BannerChangeInputDTO, BannerInputDTO } from "../../src/model/Banner"



const name = "PlayStation 5"
const image = "https://images.kabum.com.br/produtos/fotos/238671/console-sony-playstation-5_1634132554_g.jpg"
const customerId = "0e3a0973-452b-4775-ba73-f0c33513dad0"
const endAt = "30/08/2022"
const startAt = "27/08/2022"
const status = "true"

export const bannerMock: BannerInputDTO = {
    name,
    image,
    customerId,
    endAt,
    startAt,
    status
}

export const bannerMock2: BannerInputDTO = {
    name,
    image,
    customerId,
    endAt: "20/08/2022",
    startAt,
    status
}
export const bannerMock3: BannerInputDTO = {
    name,
    image,
    customerId,
    endAt,
    startAt: "20/08/2022",
    status
}
export const bannerMock4: BannerInputDTO = {
    name,
    image,
    customerId: "",
    endAt,
    startAt,
    status
}

const message = {
    id: "0f933495-b854-495b-82e4-10cfde9dd80e",
    name: "PlayStation 5",
    image: "https://images.kabum.com.br/produtos/fotos/238671/console-sony-playstation-5_1634132554_g.jpg",
    customerId: "0e3a0973-452b-4775-ba73-f0c33513dad0",
    endAt: "30/08/2022",
    startAt: "27/08/2022",
    status: 1
}

export const resultado = Banner.toBannerModel(message)

export const bannerMock5: BannerChangeInputDTO = {
    id:"0f933495-b854-495b-82e4-10cfde9dd80e",
    name:"Nome Qualquer",
    image:"https://i.zst.com.br/thumbs/12/13/3e/-733839784.jpg",
    status: "false"
}

export const bannerMock6: BannerChangeInputDTO = {
    id:"0f933495-b854-495b-82e4-10cfde9d",
    name:"Nome Qualquer",
    image:"https://i.zst.com.br/thumbs/12/13/3e/-733839784.jpg",
    status: "false"
}