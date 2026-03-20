
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
    if(count<60){
      return mensagens[60];
    }else if(count<120){
      return mensagens[120];
    }else if(count<180){
      return mensagens[180];
    }else if(count<240){
      return mensagens[240];
    }else if(count>=240 && count<500){
      return mensagens[300]
    }else{
      return mensagens[500]
    }
}

export type {Dictionary}
export {mensagens}
export {mensagemTois}