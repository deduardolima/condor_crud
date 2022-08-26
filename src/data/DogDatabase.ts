import { DogWalking } from "../model/DogWalking";
import { BaseDatabase } from "./BaseDatabase";

export class DogDatabase extends BaseDatabase {

    private static TABLE_NAME = "Dog_Walking";

    public async createDogWalking(dog: DogWalking): Promise<void> {
            console.log(dog)
        try {
            await this.getConnection()
                .insert({
                    id: dog.getId(),
                    status: dog.getStatus(),
                    data: dog.getData(),
                    preco: dog.getPreco(),
                    duracao: dog.getDuracao(),
                    latitude: dog.getLatitute(),
                    longitude: dog.getLongitude(),
                    pets: dog.getPets(),
                    horario_inicio: dog.getInicio(),
                    horario_fim: dog.getFim()

                })
                .into(DogDatabase.TABLE_NAME);
                
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getWalkingWithFilter(filtro: string, offset:number): Promise<DogWalking[]> {

        try {
            const result = await this.getConnection()
                .select('*')
                .from(DogDatabase.TABLE_NAME)
                .where('data', '>', `${filtro}`)
                .orderBy('data', 'asc')
                .limit(5)
                .offset(offset)


            return result.map(dog => DogWalking.toDogModel(dog))
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getWalkingWithoutFilter(offset:number): Promise<DogWalking[]> {

        try {
            const result = await this.getConnection()
                .select('*')
                .from(DogDatabase.TABLE_NAME)
                .orderBy('data', 'asc')                
                .limit(5)
                .offset(offset)

            return result.map(dog => DogWalking.toDogModel(dog))
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getShow(id: string): Promise<DogWalking> {
        try {
            const result = await this.getConnection()
                .select('id', 'horario_inicio', 'horario_fim')
                .from(DogDatabase.TABLE_NAME)
                .where(id)
                
            return result[0] && DogWalking.toDogModel(result[0])
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}

export default new DogDatabase()