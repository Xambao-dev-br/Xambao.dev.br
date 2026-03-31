import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface doisvalores {
    custoBase: number,
    mult: number,
}
const loja = {
    prestigio: {custoBase: 1000, mult: 1.13},
    idosas: { custoBase: 100, mult: 1.13},
    miojos: { custoBase: 600, mult: 1.13},
    thomas: { custoBase: 3600, mult: 1},
    macacoide: { custoBase: 3600, mult: 1.13},
    mutuca: { custoBase: 21600, mult: 1.13},
    jean: { custoBase: 129600, mult: 1},
    banana: {custoBase: 129600, mult: 1.13},
    fitavhs: {custoBase: 129600*6, mult: 1.13},
    ricardo: {custoBase: 129600*36, mult: 1.13}
} satisfies Record<string, doisvalores>;

interface GameState {
  aura: number;
  prestigioQuantidade: number;
  prestigioCusto: number;
  idosasQuantidade: number;
  idosasCusto: number;
  miojosQuantidade: number;
  miojosCusto: number;
  thomasQuantidade: number;
  thomasCusto: number;
  thomasAtivado: boolean;
  thomasCooldown: number;
  thomasAtivoTimer: number;
  macacoideQuantidade: number;
  macacoideCusto: number;
  mutucaQuantidade: number;
  mutucaCusto: number;
  jeanQuantidade: number;
  jeanCusto: number;
  jeanAtivado: boolean;
  jeanCooldown: number;
  jeanAtivoTimer: number;
  bananaQuantidade: number,
  fitavhsQuantidade: number,
  ricardoQuantidade: number,
  bananaCusto: number,
  fitavhsCusto: number,
  ricardoCusto: number,
  ricardoCooldown: number,
  ricardoAtivoTimer: number,
  ricardoAtivado: boolean,
  addAura: (quantidade: number) => void;
  idosasComprar: () => void;
  miojosComprar: () => void;
  thomasComprar: () => void;
  macacoideComprar: () => void;
  mutucaComprar: () => void;
  jeanComprar: () => void;
  bananaComprar: () => void;
  fitavhsComprar: () => void;
  ricardoComprar: () => void;
  fazerPrestigio: () => void;
  thomasAtivar: () => void;
  jeanAtivar: () => void;
  ricardoAtivar: () => void;
}
export const useGameStore = create<GameState>()(persist((set, get) => ({
  aura: 0,
  prestigioQuantidade: 1,
  prestigioCusto: loja.prestigio.custoBase,
  idosasQuantidade: 0,
  idosasCusto: loja.idosas.custoBase,
  miojosQuantidade: 0,
  miojosCusto: loja.miojos.custoBase,
  thomasQuantidade: 0,
  thomasCusto: loja.thomas.custoBase,
  thomasCooldown: 0,
  thomasAtivoTimer: 0,
  thomasAtivado: false,
  macacoideQuantidade: 0,
  macacoideCusto: loja.macacoide.custoBase,
  mutucaQuantidade: 0,
  mutucaCusto: loja.mutuca.custoBase,
  jeanQuantidade: 0,
  jeanCusto: loja.jean.custoBase,
  jeanCooldown: 0,
  jeanAtivoTimer: 0,
  jeanAtivado: false,
  bananaQuantidade: 0,
  fitavhsQuantidade: 0,
  ricardoQuantidade: 0,
  bananaCusto: loja.banana.custoBase,
  fitavhsCusto: loja.fitavhs.custoBase,
  ricardoCusto: loja.ricardo.custoBase,
  ricardoCooldown: 0,
  ricardoAtivoTimer: 0,
  ricardoAtivado: false,
  addAura: (n) => set(state => ({
  aura: state.aura + (n * (state.thomasAtivado ? 2 : 1))})),
  idosasComprar: () => {
    const { aura, idosasCusto } = get();
    if (aura < idosasCusto) return;
    set((state) => ({
      aura: state.aura - idosasCusto,
      idosasQuantidade: state.idosasQuantidade + 1,
      idosasCusto: Math.floor((loja.idosas.custoBase * (loja.idosas.mult**(get().idosasQuantidade+1)))),
    }));
  },
  miojosComprar: () => {
    const { aura, miojosCusto } = get();
    if (aura < miojosCusto) return;
    set((state) => ({
      aura: state.aura - miojosCusto,
      miojosQuantidade: state.miojosQuantidade + 1,
      miojosCusto: Math.floor((loja.miojos.custoBase * (loja.miojos.mult**(get().miojosQuantidade+1)))),
    }));
  },
  thomasComprar: () => {
    const { aura, thomasCusto } = get();
    if (aura < thomasCusto) return;
    set((state) => ({
      aura: state.aura - thomasCusto,
      thomasQuantidade: state.thomasQuantidade + 1,
      thomasCusto: Math.floor((loja.thomas.custoBase * (loja.thomas.mult**(get().thomasQuantidade+1)))),
    }));
  },
  macacoideComprar: () => {
    const { aura, macacoideCusto } = get();
    if (aura < macacoideCusto) return;
    set((state) => ({
      aura: state.aura - macacoideCusto,
      macacoideQuantidade: state.macacoideQuantidade + 1,
      macacoideCusto: Math.floor((loja.macacoide.custoBase * (loja.macacoide.mult**(get().macacoideQuantidade+1)))),
    }));
  },
  mutucaComprar: () => {
    const { aura, mutucaCusto } = get();
    if (aura < mutucaCusto) return;
    set((state) => ({
      aura: state.aura - mutucaCusto,
      mutucaQuantidade: state.mutucaQuantidade + 1,
      mutucaCusto: Math.floor((loja.mutuca.custoBase * (loja.mutuca.mult**(get().mutucaQuantidade+1)))),
    }));
  },
  jeanComprar: () => {
    const { aura, jeanCusto } = get();
    if (aura < jeanCusto) return;
    set((state) => ({
      aura: state.aura - jeanCusto,
      jeanQuantidade: state.jeanQuantidade + 1,
      jeanCusto: Math.floor((loja.jean.custoBase * (loja.jean.mult**(get().jeanQuantidade+1)))),
    }));
  },
  bananaComprar: () => {
    const { aura, bananaCusto } = get();
    if (aura < bananaCusto) return;
    set((state) => ({
      aura: state.aura - bananaCusto,
      bananaQuantidade: state.bananaQuantidade + 1,
      bananaCusto: Math.floor((loja.banana.custoBase * (loja.banana.mult**(get().bananaQuantidade+1)))),
    }));
  },
  fitavhsComprar: () => {
    const { aura, fitavhsCusto } = get();
    if (aura < fitavhsCusto) return;
    set((state) => ({
      aura: state.aura - fitavhsCusto,
      fitavhsQuantidade: state.fitavhsQuantidade + 1,
      fitavhsCusto: Math.floor((loja.fitavhs.custoBase * (loja.fitavhs.mult**(get().fitavhsQuantidade+1)))),
    }));
  },
  ricardoComprar: () => {
    const { aura, ricardoCusto } = get();
    if (aura < ricardoCusto) return;
    set((state) => ({
      aura: state.aura - ricardoCusto,
      ricardoQuantidade: state.ricardoQuantidade + 1,
      ricardoCusto: Math.floor((loja.ricardo.custoBase * (loja.ricardo.mult**(get().ricardoQuantidade+1)))),
    }));
  },
  fazerPrestigio: () => {
    const { aura, prestigioCusto } = get();
    if (aura < prestigioCusto) return;
    set((state) => ({
      aura: 0,
      prestigioQuantidade: state.prestigioQuantidade + 1,
      prestigioCusto: Math.floor(prestigioCusto * loja.prestigio.mult),
      idosasQuantidade: 0,
      thomasQuantidade: 0,
      miojosQuantidade: 0,
      idosasCusto: loja.idosas.custoBase,
      thomasCusto: loja.thomas.custoBase,
      miojosCusto: loja.miojos.custoBase,
      thomasCooldown: 0,
      thomasAtivoTimer: 0,
      thomasAtivado: false,
      macacoideQuantidade: 0,
      jeanQuantidade: 0,
      mutucaQuantidade: 0,
      macacoideCusto: loja.macacoide.custoBase,
      jeanCusto: loja.jean.custoBase,
      mutucaCusto: loja.mutuca.custoBase,
      jeanCooldown: 0,
      jeanAtivoTimer: 0,
      jeanAtivado: false,
      bananaQuantidade: 0,
      fitavhsQuantidade: 0,
      ricardoQuantidade: 0,
      bananaCusto: loja.macacoide.custoBase,
      ricardoCusto: loja.jean.custoBase,
      fitavhsCusto: loja.mutuca.custoBase,
      ricardoCooldown: 0,
      ricardoAtivoTimer: 0,
      ricardoAtivado: false,
    }));
  },
  thomasAtivar: () => {
    const { thomasAtivado, thomasCooldown } = get();
    if (thomasAtivado || thomasCooldown > 0) return;
    set({ thomasAtivado: true, thomasAtivoTimer: 60 });
    const interval1 = setInterval(() => {
      const { thomasAtivoTimer } = get();
      if (thomasAtivoTimer <= 1) {
        set({ thomasAtivoTimer: 0 });
        clearInterval(interval1);
        return;
      }
        set({ thomasAtivoTimer: thomasAtivoTimer - 1 });
      }, 1000);
      setTimeout(() => {
        set({ thomasAtivado: false, thomasCooldown: 540 });
        setInterval(() => {
          const { thomasCooldown } = get();
          if (thomasCooldown <= 1) {
            set({ thomasCooldown: 0 });
            return;
          }
          set({ thomasCooldown: thomasCooldown - 1 });
        }, 1000);
  }, 60_000);
},
  jeanAtivar: () => {
    const { jeanAtivado, jeanCooldown } = get();
    if (jeanAtivado || jeanCooldown > 0) return;
    set({ jeanAtivado: true, jeanAtivoTimer: 60 });
    const interval1 = setInterval(() => {
      const { jeanAtivoTimer } = get();
      if (jeanAtivoTimer <= 1) {
        set({ jeanAtivoTimer: 0 });
        clearInterval(interval1);
        return;
      }
        set({ jeanAtivoTimer: jeanAtivoTimer - 1 });
      }, 1000);
      setTimeout(() => {
        set({ jeanAtivado: false, jeanCooldown: 540 });
        setInterval(() => {
          const { jeanCooldown } = get();
          if (jeanCooldown <= 1) {
            set({ jeanCooldown: 0 });
            return;
          }
          set({ jeanCooldown: jeanCooldown - 1 });
        }, 1000);
  }, 60_000);
},
  ricardoAtivar: () => {
    const { jeanAtivado, jeanCooldown } = get();
    if (jeanAtivado || jeanCooldown > 0) return;
    set({ jeanAtivado: true, jeanAtivoTimer: 60 });
    const interval1 = setInterval(() => {
      const { jeanAtivoTimer } = get();
      if (jeanAtivoTimer <= 1) {
        set({ jeanAtivoTimer: 0 });
        clearInterval(interval1);
        return;
      }
        set({ jeanAtivoTimer: jeanAtivoTimer - 1 });
      }, 1000);
      setTimeout(() => {
        set({ jeanAtivado: false, jeanCooldown: 540 });
        setInterval(() => {
          const { jeanCooldown } = get();
          if (jeanCooldown <= 1) {
            set({ jeanCooldown: 0 });
            return;
          }
          set({ jeanCooldown: jeanCooldown - 1 });
        }, 1000);
  }, 60_000);
}}), { 
  name: 'auraclicker-storage',
  partialize: (state) => ({
    ...state,
    thomasAtivado: false,  
    thomasCooldown: 0,  
    thomasAtivoTimer: 0,
    jeanAtivado: false,  
    jeanCooldown: 0,  
    jeanAtivoTimer: 0, 
    ricardoAtivado: false,  
    ricardoCooldown: 0,  
    ricardoAtivoTimer: 0,    
  })
}));