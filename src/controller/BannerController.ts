import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { BannerInputDTO } from "../model/Banner";
import bannerBusiness from "../business/BannerBusiness";


export class BannerController {

    public create = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const { name, image, customerId, endAt, startAt, status } = req.body
            const input: BannerInputDTO = {
                name,
                image,
                customerId,
                endAt,
                startAt,
                status
            }

            const banner = await bannerBusiness.createBanner(input, token)

            res.status(201).send({ banner })

        } catch (error: any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });

        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    public getBanner = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string

            const banner = await bannerBusiness.getAllBanner(token)

            res.status(200).send({ message: banner })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    public getBannerByID = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const id = req.body

            const banner = await bannerBusiness.getBannerId(token, id)

            res.status(200).send({ message: banner })

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

}
export default new BannerController()