export default class CalculateTime {
    calculate(inicio: number, fim: number): string {

        console.log(inicio)

        const result = fim - inicio
        if (result === 0.5) {
            return "30"
        } else if (result === 1){
            return "60"
        } else{
            return `${result}`
        }
        
        
    }
}

