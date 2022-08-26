
import { DogInputDTO } from "../../src/model/DogWalking";


const data = "23/07/2022"
const duracao = "30"
const latitude = "25º25'48''Sul"
const longitude = "49º16'15'' Oeste"
const pets = 3
const inicio = 17.5
const fim = 18

export const dogMock: DogInputDTO = {
    data,
    duracao,
    latitude,
    longitude,
    pets,
    inicio,
    fim
}

export const dogMock3: DogInputDTO = {
    data,
    duracao: "80",
    latitude,
    longitude,
    pets,
    inicio,
    fim
}