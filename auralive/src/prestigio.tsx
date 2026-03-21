interface prestige {
    level: Number;
    custo: Number;
    mult: Number;
};

export let estadoPrestigio: prestige
estadoPrestigio = {
    level: 1,
    custo: 1000,
    mult: 1.15,
}

export function calcular_prestigio() {
    console.log("Antes de algoritmo: " + +estadoPrestigio.custo)
    estadoPrestigio.custo = Math.floor(+estadoPrestigio.custo * +estadoPrestigio.mult);
    console.log("Depois de algoritmo: " + +estadoPrestigio.custo)
}
