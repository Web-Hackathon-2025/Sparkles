import React, { useState } from 'react'
import * as THREE from 'three'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center font-inter">
      <div className="text-center p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <h1 className="text-3xl font-bold text-emerald-400 mb-4 tracking-tight">
          Vite + React + Three.js + Tailwind
        </h1>

        <div className="mb-6">
          <button
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded transition-colors"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
        </div>

        <div className="text-sm text-slate-400 space-y-1 font-mono">
          <p>Vite: 6.3.5</p>
          <p>Tailwind CSS: 4.1.10</p>
          <p>Three.js: 0.177.0</p>
        </div>
      </div>
    </div>
  )
}

export default App