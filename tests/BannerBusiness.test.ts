import { BannerBusiness } from "../src/business/BannerBusiness"
import { AuthenticatorMock } from "./mocks/AuthenticatorMock"
import { BannerDatabaseMock } from "./mocks/BannerDatabaseMock"
import FilterMock from "./mocks/FilterMock"
import { IdGeneratorMock } from "./mocks/idGeneratorMock"



const BannerBusinessMock = new BannerBusiness (
    new BannerDatabaseMock() as any,
    new AuthenticatorMock() as any,
    new IdGeneratorMock() as any, 
    new FilterMock() as any
)

describe("Testando o regitro de passeio", () => {

    

})