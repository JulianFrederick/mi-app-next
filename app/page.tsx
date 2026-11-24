"use client";

import { useState, useEffect } from "react";

interface NumeroItem {
  valor: number;
  ingles: string;
  espanol: string[];
}

const NUMEROS: NumeroItem[] = [
  { valor: 1, ingles: "One", espanol: ["uno", "1"] },
  { valor: 2, ingles: "Two", espanol: ["dos", "2"] },
  { valor: 3, ingles: "Three", espanol: ["tres", "3"] },
  { valor: 4, ingles: "Four", espanol: ["cuatro", "4"] },
  { valor: 5, ingles: "Five", espanol: ["cinco", "5"] },
  { valor: 6, ingles: "Six", espanol: ["seis", "6"] },
  { valor: 7, ingles: "Seven", espanol: ["siete", "7"] },
  { valor: 8, ingles: "Eight", espanol: ["ocho", "8"] },
  { valor: 9, ingles: "Nine", espanol: ["nueve", "9"] },
  { valor: 10, ingles: "Ten", espanol: ["diez", "10"] },
];

export default function Home() {
  const [indiceActual, setIndiceActual] = useState<number>(0);
  const [respuesta, setRespuesta] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [esCorrecto, setEsCorrecto] = useState<boolean | null>(null);
  const [puntos, setPuntos] = useState<number>(0);

  const numeroActual = NUMEROS[indiceActual];

  const pronunciarNumero = (texto: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = "en-US";
      utterance.rate = 0.85; // Un poco más lento para que se entienda claro
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    pronunciarNumero(numeroActual.ingles);
  }, [indiceActual]);

  const verificarRespuesta = (e: React.FormEvent) => {
    e.preventDefault();
    const limpia = respuesta.trim().toLowerCase();

    if (!limpia) return;

    if (numeroActual.espanol.includes(limpia)) {
      setEsCorrecto(true);
      setMensaje(`¡Correcto! "${numeroActual.ingles}" es ${numeroActual.espanol[0]}.`);
      setPuntos((prev) => prev + 1);
    } else {
      setEsCorrecto(false);
      setMensaje(`Intenta de nuevo. Escucha bien la pronunciación.`);
      pronunciarNumero(numeroActual.ingles);
    }
  };

  const siguienteNumero = () => {
    const nuevoIndice = Math.floor(Math.random() * NUMEROS.length);
    setIndiceActual(nuevoIndice);
    setRespuesta("");
    setMensaje("");
    setEsCorrecto(null);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-slate-400">
            Inglés Básico (1 - 10)
          </span>
          <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-bold">
            Puntos: {puntos}
          </span>
        </div>

        <div className="text-center my-8">
          <p className="text-slate-400 text-sm mb-3">
            Escucha el número y escribe su traducción al español:
          </p>
          <button
            type="button"
            onClick={() => pronunciarNumero(numeroActual.ingles)}
            className="mx-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition text-white font-semibold px-6 py-4 rounded-xl shadow-lg cursor-pointer"
          >
            <span className="text-2xl">🔊</span>
            <span>Escuchar de nuevo</span>
          </button>
        </div>

        <form onSubmit={verificarRespuesta} className="space-y-4">
          <input
            type="text"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Ej: cinco o 5"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-center text-lg"
          />

          {esCorrecto !== true ? (
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Comprobar respuesta
            </button>
          ) : (
            <button
              type="button"
              onClick={siguienteNumero}
              className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Siguiente número →
            </button>
          )}
        </form>

        {mensaje && (
          <div
            className={`mt-5 p-3 rounded-xl text-center text-sm font-medium ${
              esCorrecto
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
            }`}
          >
            {mensaje}
          </div>
        )}
      </div>
    </main>
  );
}