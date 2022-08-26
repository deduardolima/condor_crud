import { Request, Response } from "express";
import dogBusiness from "../business/DogBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { DogInputDTO } from "../model/DogWalking";

export class DogController {


    public create = async (req: Request, res: Response) => {
        try {

            const { data, duracao, latitude, longitude, pets, inicio, fim } = req.body
            const input: DogInputDTO = {
                data,
                duracao,
                latitude,
                longitude,
                pets,
                inicio,
                fim
            }

            const walking = await dogBusiness.createWalk(input);

            res.status(201).send({ message: "Dog Walking criada com sucesso", walking });

        } catch (error: any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });

        } finally {
            await BaseDatabase.destroyConnection();
        }
    }
    public getIndex = async (req: Request, res: Response) => {
        try {
            const { filtro, pagina } = req.body

            const list = await dogBusiness.getWalking(filtro,pagina)

            res.status(200).send({ list });

        } catch (error: any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });

        } finally {
            await BaseDatabase.destroyConnection();
        }
    }
    public getShow = async (req: Request, res: Response) => {

        try {
            const id = req.body

            const passeio = await dogBusiness.getShowById(id)

            res.status(200).send({ message: `${passeio} min` });

        } catch (error: any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });

        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

}
export default new DogController()