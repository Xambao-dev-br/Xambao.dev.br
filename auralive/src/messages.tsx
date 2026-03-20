
interface Dictionary {
    [key: string]: string;
  } 
const mensagens: Dictionary = { // Adicione o `=`
    60: "Você é um beta seu merda",
    120: "Você mogou um beta, mas não é alfa ainda",
    180: "Você é quase alfa, mas falta um bom caminho até lá",
    240: "Agora é um alfa, vai demorar pra ser sigma",
    300: "Quase lá...",
    500: "Agora você é um sigma."
};

function mensagemTois(count:number){
    return mensagens[count]
}

export type {Dictionary}
export {mensagens}
export {mensagemTois}