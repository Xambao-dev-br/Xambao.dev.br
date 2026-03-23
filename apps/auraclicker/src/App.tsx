import { useState, useEffect } from 'react'
import './App.css'
import Whatsapp from './assets/whatsapp.jpg'
import {mensagens} from './messages'
import {calcular_prestigio, estadoPrestigio, rendaPassiva, idosas as globalIdosas, tempo, multiplicarGanho, miojo as globalMiojo} from './ferramentas'
let apocar: number = 0;
function App() {
  let [aura, setAura] = useState(0); 
  let [thomas, setThomas] = useState(0); 
  let [idosas, setIdosas] = useState(0);
  let [miojo, setMiojo] = useState(0);
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault() 
        setAura((prev) => prev + +estadoPrestigio.quantidade)
      } else if (event.code === 'Backspace') {
        setAura((prev) => prev - +estadoPrestigio.quantidade)
      }
    }
    window.addEventListener('keyup', handleKeyUp)

    let rendaPassivaTimer: number = setInterval(() => {
      let ganho: number = (+globalIdosas.quantidade + (5 * +globalMiojo.quantidade))
      if (ganho > 0) {
        setAura(prev => prev + ganho)
      }
    }, 1000);

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      clearInterval(rendaPassivaTimer);
      }
  }, [globalIdosas.quantidade]); 

  const mensagemAtual = mensagens[Math.floor(aura / 50) * 50];

  function fazerPrestigio() {
    if (+aura >= +estadoPrestigio.custo){
      calcular_prestigio();
      setAura(0);
      setIdosas(0);
      setMiojo(0)
      globalIdosas.quantidade = 0;
      globalIdosas.custo = 100;
      globalMiojo.quantidade = 0;
      globalMiojo.custo = 10000;
      estadoPrestigio.quantidade = (+estadoPrestigio.quantidade + 1)
      
    }
    }
  return (
    <>
      <section id="center">
        <div className="hero">
          <img className="mt-[20px] w-40 h-40" src={Whatsapp} />
        </div>
        <div>
          <h1 className="" >AuraClicker</h1>
          <p>AuraClicker é um jogo sobre clicar pra ganhar aura</p>
        </div>
        <p className="text-3xl font-bold text-white auratext">Aura</p>
        <button
          className="counter aspect-square w-32 flex items-center justify-center text-5xl"
          onClick={() => setAura((count) => (count) + +estadoPrestigio.quantidade)}
        >
        <div key={aura} className="animacao-botao">
          {aura}
        </div>
        </button>
        <p 
        key={mensagemAtual} 
        className="animacao-texto text-xl min-h-[32px] text-[#f0f0f0]"
        > {mensagemAtual} </p>      
      </section>
      <div className="ticks"></div>
      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Prestigio</h2>
          <p>Nivel de prestigio atual: {+estadoPrestigio.quantidade}</p>
          <ul>
              <a onClick={() => fazerPrestigio()}>
                Prestigio (Preço: {+estadoPrestigio.custo})
              </a>
          </ul>
        </div>
        <div className="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Ferramentas de debugação</h2>
          <p>Por que debugar é legal!</p>
          <ul>
            <li>
              <a className="select-none" onClick={() => setAura((count) => (count) + 50)}>
                +50
              </a>
            </li>
            <li>
              <a className="select-none" onClick={() => setAura((count) => (count) - 50)}>
                -50
              </a>
            </li>
            <li>
              <a className="select-none" onClick={() => setAura((count) => (count) + 1000)}>
                +1000
              </a>
            </li>
            <li>
              <a className="select-none" onClick={() => setAura((count) => (count) - 1000)}>
                -1000
              </a>
            </li>
          </ul>
          <ul>
          <li>
              <a className="select-none" onClick={() => rendaPassiva(1, 1, 1, aura, setAura, setThomas, setIdosas, setMiojo)} >
                Comprar idosa <br /> Qtd: {idosas} Preço: {Math.floor(+globalIdosas.custo + (+globalIdosas.mult * +globalIdosas.quantidade))}
              </a>
            </li> 
            <li>
              <a className="select-none" onClick={() => rendaPassiva(1, 3, 1, aura, setAura, setThomas, setIdosas, setMiojo)} >
                Comprar miojo <br /> Qtd: {miojo} Preço: {Math.floor(+globalMiojo.custo + (+globalMiojo.mult * +globalMiojo.quantidade))}
              </a> 
            </li>
            <li>
              {thomas !== 1 && (
              <a className="select-none botao-thomas" onClick={() => rendaPassiva(1, 2, 1, aura, setAura, setThomas, setIdosas, setMiojo)}>
                Comprar thomas {thomas} </a> )}
            </li>
            <li>
              {thomas == 1 && apocar == 1 && (
              <a className="select-none botao-thomas" onClick={() => multiplicarGanho(2)}>
                Colocar Thomas apocar {tempo} </a> )}
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      
      <section id="spacer"></section>
    </>
  )
}

export default App
