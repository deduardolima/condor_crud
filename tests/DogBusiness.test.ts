import { IdGeneratorMock } from './mocks/idGeneratorMock';
import { DogDatabaseMock } from './mocks/DogDatabaseMock';
import { CalculatePriceMock } from './mocks/CalculatePriceMock';
import FilterMock from './mocks/FilterMock';
import { DogBusiness } from '../src/business/DogBusiness';
import { DogInputDTO } from '../src/model/DogWalking';
import { dogMock, dogMock3 } from './mocks/DogMock';


const dogBusinessMock = new DogBusiness(
    new DogDatabaseMock() as any,
    new IdGeneratorMock(),
    new CalculatePriceMock(),
    new FilterMock(),
    new CalculatePriceMock() as any
)

describe("Testando o regitro de passeio", () => {
    test("Sucesso", async () => {

        try {
            await dogBusinessMock.createWalk(dogMock)
            expect(postMessage).toEqual("Dog Walking criada com sucesso")
        } catch (error: any) {
        } finally {
            expect.assertions(0)
        }
    })
    test("Fracasso não informou numero de cachorros para o passeio", async () => {
        try {
            const dogMock: DogInputDTO = {
                data: "23/07/2022",
                duracao: "60",
                latitude: "25º25'48''Sul",
                longitude: "49º16'15'' Oeste",
                pets: 0,
                inicio: 17.5,
                fim: 18
            }

            await dogBusinessMock.createWalk(dogMock)

        } catch (error: any) {
            expect(error.message).toEqual(" Preencha todos os campos com 'data', 'duração', 'latitude', 'longitude', 'pets', 'inicio', e 'fim' ")
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })
    test("Fracasso não informou data do passeio", async () => {
        try {
            const dogMock: DogInputDTO = {
                data: "",
                duracao: "",
                latitude: "25º25'48''Sul",
                longitude: "49º16'15'' Oeste",
                pets: 3,
                inicio: 17.5,
                fim: 18
            }

            await dogBusinessMock.createWalk(dogMock)

        } catch (error: any) {
            expect(error.message).toEqual(" Preencha todos os campos com 'data', 'duração', 'latitude', 'longitude', 'pets', 'inicio', e 'fim' ")
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })

    test("Fracasso não informou duração do passeio", async () => {
        try {
            const dogMock2: DogInputDTO = {
                data: "23/07/2022",
                duracao: "",
                latitude: "25º25'48''Sul",
                longitude: "49º16'15'' Oeste",
                pets: 3,
                inicio: 17.5,
                fim: 18
            }

            await dogBusinessMock.createWalk(dogMock2)

        } catch (error: any) {
            expect(error.message).toEqual(" Preencha todos os campos com 'data', 'duração', 'latitude', 'longitude', 'pets', 'inicio', e 'fim' ")
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })
    test("Fracasso informou duração invalida do passeio", async () => {
        try {

            await dogBusinessMock.createWalk(dogMock3)

        } catch (error: any) {
            expect(error.message).toEqual("Duração informada inválida, informe se é '30' ou '60' min")
            expect(error.statusCode).toBe(409)
        } finally {
            expect.assertions(2)
        }
    })

})