
export class DogWalking {
    constructor(
        private id: string,
        private status: string,
        private data: string,
        private preco: number,
        private duracao: string,
        private latitude: string,
        private longitude: string,
        private pets: number,
        private horario_inicio: number,
        private horario_fim: number
    ) { }

    public getId = () => this.id
    public getStatus = () => this.status
    public getData = () => this.data
    public getPreco = () => this.preco
    public getDuracao = () => this.duracao
    public getLatitute = () => this.latitude
    public getLongitude = () => this.longitude
    public getPets = () => this.pets
    public getInicio = () => this.horario_inicio
    public getFim = () => this.horario_fim


    static toDogModel(dog: any) {
        return new DogWalking(dog.id, dog.status, dog.data, dog.preco, dog.duracao, dog.latitude, dog.longitude, dog.pets, dog.horario_inicio, dog.horario_fim);
    }

}
export interface DogInputDTO {
    data: string,
    duracao: string,
    latitude: string,
    longitude: string,
    pets: number,
    inicio: number,
    fim: number
}

