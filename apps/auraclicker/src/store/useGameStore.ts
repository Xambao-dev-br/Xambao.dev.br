import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface doisvalores {
    custoBase: number,
    mult: number,
}
const loja = {
    prestigio: {custoBase: 1000, mult: 1.15},
    idosas: { custoBase: 100, mult: 1.15},
    miojos: { custoBase: 600, mult: 1.10},
    thomas: { custoBase: 10000, mult: 1},
} satisfies Record<string, doisvalores>;

interface GameState {
  aura: number;
  prestigioQuantidade: number;
  prestigioCusto: number;
  idosasQuantidade: number;
  idosasCusto: number;
  thomasQuantidade: number;
  thomasCusto: number;
  miojosQuantidade: number;
  miojosCusto: number;
  addAura: (quantidade: number) => void;
  idosasComprar: () => void;
  thomasComprar: () => void;
  miojosComprar: () => void;
  fazerPrestigio: () => void;
  recalcular: () => void;
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
  addAura: (quantidade) =>
    set((state) => ({ aura: state.aura + quantidade })),
  idosasComprar: () => {
    const { aura, idosasCusto } = get();
    if (aura < idosasCusto) return;
    set((state) => ({
      aura: state.aura - idosasCusto,
      idosasQuantidade: state.idosasQuantidade + 1,
      idosasCusto: Math.floor(idosasCusto * loja.idosas.mult),
    }));
  },
  miojosComprar: () => {
    const { aura, miojosCusto } = get();
    if (aura < miojosCusto) return;
    set((state) => ({
      aura: state.aura - miojosCusto,
      miojosQuantidade: state.miojosQuantidade + 1,
      miojosCusto: Math.floor(miojosCusto * loja.miojos.mult),
    }));
  },
  thomasComprar: () => {
    const { aura, thomasCusto } = get();
    if (aura < thomasCusto) return;
    set((state) => ({
      aura: state.aura - thomasCusto,
      thomasQuantidade: state.thomasQuantidade + 1,
      thomasCusto: Math.floor(thomasCusto * loja.thomas.mult),
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
    }));
  },
  recalcular: () => {
    set((state) => ({
      idosasCusto: Math.floor((loja.idosas.custoBase * (loja.idosas.mult**state.idosasQuantidade))),
      miojosCusto: Math.floor((loja.miojos.custoBase * (loja.miojos.mult**state.miojosQuantidade))),
      thomasCusto: Math.floor((loja.thomas.custoBase * (loja.thomas.mult**state.thomasQuantidade))),
    }));
  }
} 
), { name: 'auraclicker-storage'} ));