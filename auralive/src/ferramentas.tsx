export let estadoPrestigio: prestige;
export let idosas: number = 0;
export let thomas: number = 0;
export const sono = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface prestige {
    level: Number;
    custo: Number;
    mult: Number;
};

estadoPrestigio = {
    level: 1,
    custo: 1000,
    mult: 1.15,
};

export function calcular_prestigio() {
    console.log("Antes de algoritmo: " + +estadoPrestigio.custo);
    estadoPrestigio.custo = Math.floor(+estadoPrestigio.custo * +estadoPrestigio.mult);
    console.log("Depois de algoritmo: " + +estadoPrestigio.custo);
};

// rp_comando pode ser 1 ou 2, sendo 1 = comprar, 2 = vender...
// rp_quem pode ser 1 ou 2, sendo 1 = idosa, 2 = thomas
// rp_quando só pode ser 1 por ora.


export function rendaPassiva(
    rp_comando: number, 
    rp_quem: number, 
    rp_quanto: number,
    setThomas: any,
    setIdosas: any, ) {
    switch (rp_comando) {
        case 1: //1 é compra que nem ta escrito ali encima
            switch (rp_quem) {
                case 1: // 1 é idosa
                    console.log("Idosa comprada com sucesso!");
                    setIdosas((v: number) => v + rp_quanto)
                    break;
                case 2: // 2 é thomas
                    console.log("Thomas comprado com sucesso!");
                    setThomas((v: number) => v + rp_quanto)
                    break;
                default:
                    return;
            }
            break;
        case 2: //2 é vender
            switch (rp_quem) {
                case 1: // 1 é idosa
                    console.log("Idosa vendida com sucesso!");
                    setIdosas((v: number) => v - rp_quanto)
                    break;
                case 2: // 2 é thomas
                    console.log("Thomas vendido com sucesso!");
                    setThomas((v: number) => v - rp_quanto)
                    break;
                default:
                    return;
            }
    }
}
