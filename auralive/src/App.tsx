import { useState, useEffect, type JSX } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import { mensagens} from './messages'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault() 
        setCount((prev) => prev + 1)
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src="data:image/jpeg;base64,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" className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>AuraClicker</h1>
          <p>AuraClicker é um jogo sobre clicar pra ganhar aura</p>
          mensagem
        </div>
        <h2 className="">Aura</h2>
        <button
          className="counter aspect-square w-32 flex items-center justify-center text-5xl"
          onClick={() => setCount((count) => (count) + 1)}
        >
        {count}
        </button>
        <p>{mensagens[count]}</p>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Você tem aura</h2>
          <p>fique feliz</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                NÃO clique, você perderá aura
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Não grita
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
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
