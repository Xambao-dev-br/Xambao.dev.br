  import { useEffect, useCallback } from 'react';
  import './App.css';
  import Whatsapp from './assets/whatsapp.jpg';
  import {mensagens} from './messages';
  import { useGameStore } from './store/useGameStore';
  import { useShallow } from 'zustand/react/shallow';

  export default function App() {
    (window as Window & typeof globalThis & { useGameStore: typeof useGameStore }).useGameStore = useGameStore;
    const { aura, addAura} = useGameStore(
      useShallow((state) => ({aura: state.aura, addAura: state.addAura})));
    const { prestigioQuantidade, prestigioCusto, fazerPrestigio} = useGameStore(
      useShallow((state) => ({prestigioQuantidade: state.prestigioQuantidade, prestigioCusto: state.prestigioCusto, fazerPrestigio: state.fazerPrestigio})));
    const { idosasQuantidade, idosasCusto, idosasComprar } = useGameStore(
      useShallow((state) => ({idosasQuantidade: state.idosasQuantidade, idosasCusto: state.idosasCusto, idosasComprar: state.idosasComprar})));
    const { thomasQuantidade, thomasCusto, thomasComprar, thomasAtivar, thomasAtivado, thomasCooldown, thomasAtivoTimer } = useGameStore(
      useShallow((state) => ({thomasQuantidade: state.thomasQuantidade, thomasCusto: state.thomasCusto, thomasComprar: state.thomasComprar, thomasAtivar: state.thomasAtivar, thomasAtivado: state.thomasAtivado, thomasCooldown: state.thomasCooldown, thomasAtivoTimer: state.thomasAtivoTimer})));
    const { miojosQuantidade, miojosCusto, miojosComprar } = useGameStore(
      useShallow((state) => ({miojosQuantidade: state.miojosQuantidade, miojosCusto: state.miojosCusto, miojosComprar: state.miojosComprar})));
    const { macacoideQuantidade, macacoideCusto, macacoideComprar } = useGameStore(
      useShallow((state) => ({macacoideQuantidade: state.macacoideQuantidade, macacoideCusto: state.macacoideCusto, macacoideComprar: state.macacoideComprar})));
    const { jeanQuantidade, jeanCusto, jeanComprar, jeanAtivar, jeanAtivado, jeanCooldown, jeanAtivoTimer } = useGameStore(
      useShallow((state) => ({jeanQuantidade: state.jeanQuantidade, jeanCusto: state.jeanCusto, jeanComprar: state.jeanComprar, jeanAtivar: state.jeanAtivar, jeanAtivado: state.jeanAtivado, jeanCooldown: state.jeanCooldown, jeanAtivoTimer: state.jeanAtivoTimer})));
    const { mutucaQuantidade, mutucaCusto, mutucaComprar } = useGameStore(
      useShallow((state) => ({mutucaQuantidade: state.mutucaQuantidade, mutucaCusto: state.mutucaCusto, mutucaComprar: state.mutucaComprar})));
    const { bananaQuantidade, bananaCusto, bananaComprar } = useGameStore(
      useShallow((state) => ({bananaQuantidade: state.bananaQuantidade, bananaCusto: state.bananaCusto, bananaComprar: state.bananaComprar})));
    const { ricardoQuantidade, ricardoCusto, ricardoComprar, ricardoAtivar, ricardoAtivado, ricardoCooldown, ricardoAtivoTimer } = useGameStore(
      useShallow((state) => ({ricardoQuantidade: state.ricardoQuantidade, ricardoCusto: state.ricardoCusto, ricardoComprar: state.ricardoComprar, ricardoAtivar: state.ricardoAtivar, ricardoAtivado: state.ricardoAtivado, ricardoCooldown: state.ricardoCooldown, ricardoAtivoTimer: state.ricardoAtivoTimer})));
    const { fitavhsQuantidade, fitavhsCusto, fitavhsComprar } = useGameStore(
      useShallow((state) => ({fitavhsQuantidade: state.fitavhsQuantidade, fitavhsCusto: state.fitavhsCusto, fitavhsComprar: state.fitavhsComprar})));
    const mensagemAtual = mensagens[Math.floor(aura / 50) * 50];
    const debug: boolean = false;
    const apocar: boolean = true;
    const handleClick = useCallback(() => {
      const critico = Math.random() < 0.010;
      const maisUm = document.createElement('p');  
      const valorBase = prestigioQuantidade * (1 + (+thomasAtivado)) * (1 + (+jeanAtivado * 2) * (1 + (+ricardoAtivado * 5)));
      const valorFinal = critico ? (512 * valorBase) : valorBase;
      addAura(valorFinal);
      if (critico) {
        maisUm.style.color = "#FFD700";
        maisUm.style.fontWeight = "bold";
        maisUm.style.fontSize = "1.5rem";
        } else {
        maisUm.style.color = "var(--accent)";
        }
      maisUm.textContent = critico ? `+${valorFinal} CRÍTICO!` : `+${valorFinal}`;
      maisUm.classList.add("animacaotois");
      maisUm.addEventListener('animationend', () => {
      maisUm.remove();
  });
  const counter = document.getElementById('counter');
  if (counter) {
    counter.appendChild(maisUm);
  }}, [thomasAtivado, addAura, prestigioQuantidade, jeanAtivado, ricardoAtivado]);
    
    useEffect(() => {
      const handleKeyUp = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
          event.preventDefault();
          handleClick();
        } else if (event.code === 'Backspace' && debug) {
          addAura(-1);
        }
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
          event.preventDefault();
        } else if (event.code === "Enter") {
          event.preventDefault();
        } else if (event.code === "NumpadEnter") {
          event.preventDefault();
        }
      };
      window.addEventListener('keyup', handleKeyUp);
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keyup', handleKeyUp);
      };
      }, [aura, addAura, debug, handleClick]); 

      useEffect(() => {
    const ganhoBruto = (idosasQuantidade + (5 * miojosQuantidade) + (30 * macacoideQuantidade) + (150 * mutucaQuantidade) + (650 * bananaQuantidade) + (2500 * fitavhsQuantidade)) 
          * (+thomasAtivado + 1) * ((+jeanAtivado * 2) + 1);
    if (ganhoBruto <= 0) return;
    const intervaloDesejado = 1000 / ganhoBruto;
    const intervaloSeguro = Math.max(intervaloDesejado, 10);
    const multiplicadorDeTique = intervaloDesejado < 10 ? Math.ceil(10 / intervaloDesejado) : 1;
    const rendaPassivaTimer = setInterval(() => {
        for (let i = 0; i < multiplicadorDeTique; i++) {
            addAura(1);
        }
    }, intervaloSeguro);

    return () => clearInterval(rendaPassivaTimer);
}, [addAura, idosasQuantidade, miojosQuantidade, macacoideQuantidade, mutucaQuantidade, thomasAtivado, jeanAtivado, fitavhsQuantidade, bananaQuantidade]);

useEffect(() => {
  let hue = 0;

  const interval = setInterval(() => {
    // Incrementa o hue para ciclar as cores (0 a 360)
    hue = (hue + 1) % 360;

    const root = document.documentElement.style;
    root.setProperty('--accent', `hsl(${hue}, 100%, 61%)`);
    root.setProperty('--accent-bg', `hsl(${hue}, 100%, 61%, 0.1)`);
    root.setProperty('--accent-border', `hsl(${hue}, 100%, 61%, 0.5)`);
  }, 50); // 50ms controla a velocidade do ciclo

  return () => clearInterval(interval); // Limpa ao fechar o componente
}, []);
    return (
      <>
        <section id="center">
          <div className="hero">
            <img className="mt-[20px] mb-[20px] w-40 h-40" src={Whatsapp} />
          </div>
          <div>
            <h1>AuraClicker</h1>
            <p>AuraClicker é um jogo sobre clicar pra ganhar aura</p>
          </div>
          <p className="text-3xl font-bold text-white auratext">Aura</p>
          <button id="counter"
            className="counter aspect-square w-40 flex items-center justify-center text-4xl"
            onClick={handleClick}
          >
          <div key={aura} className="animacao-botao">
            {aura}
          </div>
          </button>
          <p key={mensagemAtual}
          className="animacao-texto text-xl min-h-[32px]"
          > {mensagemAtual} </p>      
        </section>
        <div className="ticks"></div>
        <section id="next-steps">
          <div id="docs">
            <svg className="icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#documentation-icon"></use>
            </svg>
            <h2>Prestigio</h2>
            <p>Nivel de prestigio atual: {prestigioQuantidade}</p>
            <ul>
                <a onClick={() => fazerPrestigio()}>
                  Prestigio (Preço: {prestigioCusto})
                </a>
            </ul>
          </div>
          <div className="social">
            <svg className="icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#social-icon"></use>
            </svg>
            <h2>Loja</h2>
            <p>Compre coisas legais</p>
            {debug && ( 
            <ul>
              <li>
                <a className="select-none" onClick={() => addAura(50)}>
                  +50
                </a>
              </li>
              <li>
                <a className="select-none" onClick={() => addAura(-50)}>
                  -50
                </a>
              </li>
              <li>
                <a className="select-none" onClick={() => addAura(1000)}>
                  +1000
                </a>
              </li>
              <li>
                <a className="select-none" onClick={() => addAura(-1000)}>
                  -1000
                </a>
              </li>
            </ul> )}
            <ul>
            <li>
                <a className="select-none" onClick={() => idosasComprar()} >
                  Comprar idosa <br /> Qtd: {idosasQuantidade} <br /> Preço: {idosasCusto}
                </a>
              </li> 
              <li>
                <a className="select-none" onClick={() => miojosComprar()} >
                  Comprar miojo <br /> Qtd: {miojosQuantidade} <br /> Preço: {miojosCusto}
                </a> 
              </li>
              <li>
                {thomasQuantidade < 1 && apocar && (
                <a className="select-none" onClick={() => thomasComprar()}>
                  Comprar thomas <br /> Preço: <br /> {thomasCusto} </a> )}
                {thomasQuantidade == 1 && apocar && thomasAtivado == false && thomasCooldown == 0 && (
                <a className="select-none" onClick={() => thomasAtivar()}>
                  Colocar Thomas pra Pocar </a> )}
                {thomasQuantidade == 1 && apocar && thomasCooldown > 0 && (
                <a className="select-none">
                  Thomas em cooldown por <br /> {`${Math.floor(thomasCooldown / 60)}m ${thomasCooldown % 60}s`}
                </a>)}
                {thomasQuantidade == 1 && apocar && thomasAtivado && thomasAtivoTimer > 0 && (
                <a className="select-none">
                  Thomas ativo por : <br /> {`${Math.floor(thomasAtivoTimer / 60)}m ${thomasAtivoTimer % 60}s`}
                </a>)}
              </li>
            </ul>
            <ul>
            <li>
                <a className="select-none" onClick={() => macacoideComprar()} >
                  Comprar macacoide <br /> Qtd: {macacoideQuantidade} <br /> Preço: {macacoideCusto}
                </a>
              </li> 
              <li>
                <a className="select-none" onClick={() => mutucaComprar()} >
                  Comprar mutuca <br /> Qtd: {mutucaQuantidade} <br /> Preço: {mutucaCusto}
                </a> 
              </li>
              <li>
                {jeanQuantidade < 1 && apocar && (
                <a className="select-none" onClick={() => jeanComprar()}>
                  Comprar Jean <br /> Preço: {jeanCusto} </a> )}
                {jeanQuantidade == 1 && apocar && jeanAtivado == false && jeanCooldown == 0 && (
                <a className="select-none" onClick={() => jeanAtivar()}>
                  Colocar Jean pra Pocar </a> )}
                {jeanQuantidade == 1 && apocar && jeanCooldown > 0 && (
                <a className="select-none">
                  Jean em cooldown por <br /> {`${Math.floor(jeanCooldown / 60)}m ${jeanCooldown % 60}s`}
                </a>)}
                {jeanQuantidade == 1 && apocar && jeanAtivado && jeanAtivoTimer > 0 && (
                <a className="select-none">
                  Jean ativo por : <br /> {`${Math.floor(jeanAtivoTimer / 60)}m ${jeanAtivoTimer % 60}s`}
                </a>)}
              </li>
            </ul>
            <ul>
            <li>
                <a className="select-none" onClick={() => bananaComprar()} >
                  Comprar banana <br /> Qtd: {bananaQuantidade} <br /> Preço: {bananaCusto}
                </a>
              </li> 
              <li>
                <a className="select-none" onClick={() => fitavhsComprar()} >
                  Comprar Fita VHS <br /> Qtd: {fitavhsQuantidade} <br /> Preço: {fitavhsCusto}
                </a> 
              </li>
              <li>
                {ricardoQuantidade < 1 && apocar && (
                <a className="select-none" onClick={() => ricardoComprar()}>
                  Comprar Ricardão <br /> Preço: {ricardoCusto} </a> )}
                {ricardoQuantidade == 1 && apocar && ricardoAtivado == false && ricardoCooldown == 0 && (
                <a className="select-none" onClick={() => ricardoAtivar()}>
                  Colocar Ricardo pra Pocar </a> )}
                {ricardoQuantidade == 1 && apocar && ricardoCooldown > 0 && (
                <a className="select-none">
                  Ricardo em cooldown por <br /> {`${Math.floor(ricardoCooldown / 60)}m ${ricardoCooldown % 60}s`}
                </a>)}
                {ricardoQuantidade == 1 && apocar && ricardoAtivado && ricardoAtivoTimer > 0 && (
                <a className="select-none">
                  Ricardo ativo por : <br /> {`${Math.floor(ricardoAtivoTimer / 60)}m ${ricardoAtivoTimer % 60}s`}
                </a>)}
              </li>
            </ul>
          </div>
        </section>

        <div className="ticks"></div>
        
        <section id="spacer"></section>
      </>
    );
  };
