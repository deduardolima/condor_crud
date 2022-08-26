
import { DogDatabase } from "../data/DogDatabase";
import { CustomError } from "../error/CustomError";
import CalculatePrice from "../model/CalculatePrice";
import CalculateTime from "../model/CalculateTime";
import { DogInputDTO, DogWalking } from "../model/DogWalking";
import Filter from "../model/Filter";
import IdGenerator from "../services/IdGenerator";

export class DogBusiness {
    constructor(
        private dogDatabase: DogDatabase,
        private idGeneratator: IdGenerator,
        private calculatePrice: CalculatePrice,
        private filter: Filter,
        private calculateTime: CalculateTime
    ) { }

    public createWalk = async (dog: DogInputDTO) => {

        try {
            const { data, duracao, latitude, longitude, pets, inicio, fim } = dog;
            if (!data || !duracao || !latitude || !longitude || !pets || !inicio || !fim) {
                throw new CustomError(422, " Preencha todos os campos com 'data', 'duração', 'latitude', 'longitude', 'pets', 'inicio', e 'fim' ");
            }
            
            const revetedData = data.split('/').reverse().join('-')

            const price = this.calculatePrice.calculate(duracao, pets)

            const id = this.idGeneratator.generate();

            const status = "Agendado"

            const newWalk = new DogWalking(id, status, revetedData, price, duracao, latitude, longitude, pets, inicio, fim)

            await this.dogDatabase.createDogWalking(newWalk);


            return newWalk


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    public getWalking = async (filtro: string, pagina: number) => {

        try {

            if (pagina < 1 || isNaN(pagina)) {
                pagina = 1
            }

            if (filtro) {
                const filtroValidado = this.filter.calculate(filtro)

                let size = 5
                let offset = size * (pagina - 1)

                const lista = await this.dogDatabase.getWalkingWithFilter(filtroValidado, offset);

                if (lista.length < 1) {
                    throw new CustomError(404, "Não foi possivel encontrar a lista")
                }
                return lista
            }
            if (!filtro) {

                let size = 5
                let offset = size * (pagina - 1)

                const lista = await this.dogDatabase.getWalkingWithoutFilter(offset)

                if (lista.length < 1) {
                    throw new CustomError(404, "Não foi possivel encontrar a lista")
                }
                return lista
            }

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    public getShowById = async (id: string) => {
        try {
            if (!id) {
                throw new CustomError(422, "Informe um Id para esta consulta");
            }
            const passeio = await this.dogDatabase.getShow(id)

            if (!passeio) {
                throw new CustomError(404, "Não foi possivel encontrar um passeio com id informado")
            }
            console.log(passeio)

            const duracaoReal = this.calculateTime.calculate(passeio.getInicio(), passeio.getFim())

            return duracaoReal

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}
export default new DogBusiness(
    new DogDatabase(),
    new IdGenerator(),
    new CalculatePrice(),
    new Filter(),
    new CalculateTime()
)