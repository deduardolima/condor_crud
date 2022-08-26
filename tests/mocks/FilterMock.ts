export default class FilterMock {
    calculate(filtro: string): string {

        if (filtro === "sim") {
            const data = new Date()
            const dia = String((data.getDate()) - 1).padStart(2, '0');
            const mes = String((data.getMonth()) + 1).padStart(2, '0');
            const ano = data.getFullYear();
            const dataAtual = ano + '/' + mes + '/' + dia

            return dataAtual
        }
        else {
            return ""
        }
    }
}

