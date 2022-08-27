import { BannerBusiness } from "../src/business/BannerBusiness"
import { BannerInputDTO } from "../src/model/Banner"
import { AuthenticatorMock } from "./mocks/AuthenticatorMock"
import { BannerDatabaseMock } from "./mocks/BannerDatabaseMock"
import { bannerMock, bannerMock2, bannerMock3, bannerMock5, bannerMock6, resultado } from "./mocks/BannerMock"
import FilterMock from "./mocks/FilterMock"
import { IdGeneratorMock } from "./mocks/idGeneratorMock"



const BannerBusinessMock = new BannerBusiness(
    new BannerDatabaseMock() as any,
    new AuthenticatorMock() as any,
    new IdGeneratorMock(),
    new FilterMock()
)

describe("Testando a criação de banner", () => {
    test("Sucesso", async () => {
        const token = "token"
        try {
            await BannerBusinessMock.createBanner(bannerMock, token)
            expect(token).toEqual("token")
        } catch (error: any) {
        } finally {
            expect.assertions(1)
        }
    })
    test("Falha, data final inválida", async () => {
        const token = "token"
        try {
            await BannerBusinessMock.createBanner(bannerMock2, token)
            expect(409).toEqual("Data final é menor que data de ínicio")
        } catch (error: any) {
        } finally {
            expect.assertions(0)
        }
    })
    test("Falha, data inicial inválida", async () => {
        const token = "token"
        try {
            await BannerBusinessMock.createBanner(bannerMock3, token)
            expect(409).toEqual("Data de ínicio é inválida")
        } catch (error: any) {
        } finally {
            expect.assertions(0)
        }
    })
    test("Falha, não preenchimento de todos os campos", async () => {
        const token = "token"
        try {
            await BannerBusinessMock.createBanner(bannerMock3, token)
            expect(422).toEqual(" Preencha todos os campos 'name', 'image','custumerID', 'endAt' , 'startAt' e 'status'")
        } catch (error: any) {
        } finally {
            expect.assertions(0)
        }
    })

})
describe("Testando pegar banner", () => {
    test("Fracasso informou ID incorreto", async () => {
        try {
            const token = "token"
            const id = "121213132132132"
            await BannerBusinessMock.getBannerId(token, id)
        } catch (error: any) {
            expect(error.message).toEqual("Não foi possivel encontrar o banner")
            expect(error.statusCode).toBe(404)
        } finally {
            expect.assertions(0)
        }
    })
    test("Sucesso", async () => {

        const token = "token"
        const id = "0f933495-b854-495b-82e4-10cfde9dd80e"
        const message = resultado
        try {
            await BannerBusinessMock.getBannerId(token, id)
            expect(message).toEqual(resultado)
        } catch (error: any) {
        } finally {
            expect.assertions(1)
        }
    })
})
describe("Testando update Banner", () => {
    test("Fracasso informou ID incorreto", async () => {
        const token = "token"
        try {
            await BannerBusinessMock.changeBanner(bannerMock6, token)
        } catch (error: any) {
            expect(error.message).toEqual("Não foi possivel encontrar o banner")
            expect(error.statusCode).toBe(404)
        } finally {
            expect.assertions(0)
        }
    })
    test("Sucesso", async () => {
        const token = "token"
        const message = "Banner alterado com sucesso"
        try {
            await BannerBusinessMock.createBanner(bannerMock, token)
            expect(message).toEqual("Banner alterado com sucesso")
        } catch (error: any) {
        } finally {
            expect.assertions(1)
        }
    })
})

describe("Testando deletar Banner", () => {
    test("Fracasso informou ID incorreto", async () => {
        const token = "token"
        const id = "1515165411564151554"
        try {
            await BannerBusinessMock.deleteBanner(token, id)
        } catch (error: any) {
            expect(error.message).toEqual("Não foi possivel encontrar o banner")
            expect(error.statusCode).toBe(404)
        } finally {
            expect.assertions(0)
        }
    })
    test("Sucesso", async () => {
        const token = "token"
        const id = "0f933495-b854-495b-82e4-10cfde9dd80e"
        const message = "Banner deletado com sucesso"
        try {
            await BannerBusinessMock.deleteBanner(token, id)
            expect(message).toEqual("Banner deletado com sucesso")
        } catch (error: any) {
        } finally {
            expect.assertions(1)
        }
    })
})