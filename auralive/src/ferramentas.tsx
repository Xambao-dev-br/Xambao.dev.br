export let estadoPrestigio: tresbagulho;
export let idosas: tresbagulho;
export let thomas: tresbagulho;
export const sono = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface tresbagulho {
    quantidade: Number;
    custo: Number;
    mult: Number;
};

estadoPrestigio = {
    quantidade: 1,
    custo: 1000,
    mult: 1.15,
};

idosas = {
    quantidade: 0,
    custo: 100,
    mult: 15
};

thomas = {
    quantidade: 0,
    custo: 10000,
    mult: 1
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
    setIdosas: any,
    setAura: any,
    aura: number, ) {
    switch (rp_comando) {
        case 1: //1 é compra que nem ta escrito ali encima
            switch (rp_quem) {
                case 1: // 1 é idosa
                    if (aura >= Math.floor(+idosas.custo + (+idosas.mult * +idosas.quantidade))) { 
                        idosas.custo = Math.floor(+idosas.custo + (+idosas.mult * +idosas.quantidade))
                        console.log("Preço idosa:" + +idosas.custo);
                        setAura((prev: number) => prev - +idosas.custo);
                        idosas.quantidade = (+idosas.quantidade + 1)
                        setIdosas((v: number) => v + rp_quanto)
                    }
                    break;
                case 2: // 2 é thomas
                    if (aura >= +thomas.custo && +thomas.quantidade < 1) {
                        console.log("Thomas comprado por " + +thomas.custo)
                        setAura((prev: number) => prev - +thomas.custo)
                        thomas.quantidade = (+thomas.quantidade + 1)
                        setThomas((v: number) => v + 1)

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
