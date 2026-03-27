  import { useEffect, useCallback } from 'react';
  import './App.css';
  import Whatsapp from './assets/whatsapp.jpg';
  import {mensagens} from './messages';
  import { useGameStore } from './store/useGameStore';
  import { useShallow } from 'zustand/react/shallow';

  export default function App() {
    const { aura, addAura} = useGameStore(
      useShallow((state) => ({aura: state.aura, addAura: state.addAura})));
    const { prestigioQuantidade, prestigioCusto, fazerPrestigio} = useGameStore(
      useShallow((state) => ({prestigioQuantidade: state.prestigioQuantidade, prestigioCusto: state.prestigioCusto, fazerPrestigio: state.fazerPrestigio})));
    const { idosasQuantidade, idosasCusto, idosasComprar } = useGameStore(
      useShallow((state) => ({idosasQuantidade: state.idosasQuantidade, idosasCusto: state.idosasCusto, idosasComprar: state.idosasComprar})));
    const { thomasQuantidade, thomasCusto, thomasComprar } = useGameStore(
      useShallow((state) => ({thomasQuantidade: state.thomasQuantidade, thomasCusto: state.thomasCusto, thomasComprar: state.thomasComprar})));
    const { miojosQuantidade, miojosCusto, miojosComprar } = useGameStore(
      useShallow((state) => ({miojosQuantidade: state.miojosQuantidade, miojosCusto: state.miojosCusto, miojosComprar: state.miojosComprar})));
    const mensagemAtual = mensagens[Math.floor(aura / 50) * 50];
    const debug: boolean = false;
    const apocar: boolean = false;
    const handleClick = useCallback(() => {
      const critico = Math.random() < 0.025;
      addAura(critico ? Math.round(aura * 0.1) : prestigioQuantidade);
      const maisUm = document.createElement('p');
      maisUm.textContent = critico ? 'CRITICO' : `+${prestigioQuantidade}`;
      maisUm.classList.add("animacaotois");
      maisUm.addEventListener('animationend', () => {
        maisUm.remove(); });
      const counter = document.getElementById('counter');
      if (counter) {
        counter.appendChild(maisUm);
  }
    }, [aura, addAura, prestigioQuantidade]);

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
        if (event.code === "Enter") {
          event.preventDefault()
        } else if (event.code === "NumpadEnter") {
          event.preventDefault()
        }
      }
      window.addEventListener('keyup', handleKeyUp);
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keyup', handleKeyUp);
      };
      }, [aura, addAura, debug, handleClick]); 

      useEffect(() => {
        const ganho = idosasQuantidade + (5 * miojosQuantidade);
        const intervalo = ganho > 0 ? 1000 / ganho : 1000;
        const rendaPassivaTimer: number = setInterval(() => {
            addAura(ganho > 0 ? 1 : 0);
        }, intervalo);

          return () => {
            clearInterval(rendaPassivaTimer);
            };
        }, [addAura, idosasQuantidade, miojosQuantidade]); 

        useEffect(() => {
        const hue: number = (aura * 2) % 360;
        document.documentElement.style.setProperty('--accent', `hsl(${hue}, 100%, 61%)`);
        document.documentElement.style.setProperty('--accent-bg', `hsl(${hue}, 100%, 61%, 0.1)`);
        document.documentElement.style.setProperty('--accent-border', `hsl(${hue}, 100%, 61%, 0.5)`);
      }, [aura]); 

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
            <p>Compre idosas e miojo!!!</p>
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
                  Comprar idosa <br /> Qtd: {idosasQuantidade} Preço: {idosasCusto}
                </a>
              </li> 
              <li>
                <a className="select-none" onClick={() => miojosComprar()} >
                  Comprar miojo <br /> Qtd: {miojosQuantidade} Preço: {miojosCusto}
                </a> 
              </li>
              <li>
                {thomasQuantidade < 1 && apocar && (
                <a className="select-none botao-thomas" onClick={() => thomasComprar()}>
                  Comprar thomas {thomasCusto} </a> )}
              </li>
              <li>
                {thomasQuantidade < 1 && apocar && (
                <a className="select-none botao-thomas" onClick={() => console.log("Porra nenhuma ainda")}>
                  Colocar Thomas apocar </a> )}
              </li>
            </ul>
          </div>
        </section>

        <div className="ticks"></div>
        
        <section id="spacer"></section>
      </>
    );
  };
