import { CustomError } from "../error/CustomError"

export default class CalculatePrice {
    calculate(duração: string, pets: number): number {

        if (duração === "30") {

            return 25 + (pets > 1 ? ((pets - 1) * 15) : 0)
        }
        if (duração === "60") {
            return 35 + (pets > 1 ? ((pets - 1) * 20) : 0)
        }
        else {
            throw new CustomError(409, "Duração informada inválida, informe se é '30' ou '60' min")
        }
    }
}


