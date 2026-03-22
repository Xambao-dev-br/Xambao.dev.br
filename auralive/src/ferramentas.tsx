export let estadoPrestigio: tresbagulho;
export let idosas: tresbagulho;
export let thomas: tresbagulho;
export let miojo: tresbagulho;
export let tempo: number;
export const sono = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface tresbagulho {
    quantidade: number;
    custo: number;
    mult: number;
};

estadoPrestigio = {
    quantidade: 1,
    custo: 1000,
    mult: 1.15,
};

idosas = {
    quantidade: 0,
    custo: 100,
    mult: 1.15
};

thomas = {
    quantidade: 0,
    custo: 10000,
    mult: 1
};

miojo = {
    quantidade: 0,
    custo: 10000,
    mult: 1.15,
}


export function calcular_prestigio() {
    console.log("Antes de algoritmo: " + +estadoPrestigio.custo);
    estadoPrestigio.custo = Math.floor(+estadoPrestigio.custo * +estadoPrestigio.mult);
    console.log("Depois de algoritmo: " + +estadoPrestigio.custo);
};

export function multiplicarGanho(multiplicador: number) {
    console.log(multiplicador)
    
};

// rp_comando pode ser 1 ou 2, sendo 1 = comprar, 2 = vender...
// rp_quem pode ser 1 ou 2, sendo 1 = idosa, 2 = thomas
// rp_quando só pode ser 1 por ora.

export function rendaPassiva(
    rp_comando: number, 
    rp_quem: number, 
    rp_quanto: number,
    aura: number,
    setAura: any,
    setThomas: any,
    setIdosas: any,
    setMiojo: any,
     ) {
    switch (rp_comando) {
        case 1: //1 é compra que nem ta escrito ali encima
            switch (rp_quem) {
                case 1: // 1 é idosa
                    const custoIdosa = Math.floor(idosas.custo);
                    if (aura >= custoIdosa) {
                        setAura((prev: number) => prev - custoIdosa); 
                        idosas.custo = Math.floor(custoIdosa * idosas.mult)
                        console.log("Preço idosa:" + idosas.custo);
                        idosas.quantidade = (idosas.quantidade + 1)
                        setIdosas((v: number) => v + 1)
                    }
                    break;
                case 2: // 2 é thomas
                    if (aura >= thomas.custo) {
                        setAura((prev: number) => prev - thomas.custo)
                        console.log("Thomas comprado por " + thomas.custo)
                        thomas.quantidade = (thomas.quantidade + 1)
                        setThomas((v: number) => v + 1)

                    }
                    break;
                case 3: // 3 é miojo
                    const custoMiojo = Math.floor(miojo.custo);
                    if (aura >= custoMiojo) {
                        setAura((prev: number) => prev - custoMiojo); 
                        miojo.custo = Math.floor(custoMiojo * miojo.mult)
                        console.log("Preço miojo:" + miojo.custo);
                        miojo.quantidade = (miojo.quantidade + 1)
                        setMiojo((v: number) => v + 1)
                    }
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
