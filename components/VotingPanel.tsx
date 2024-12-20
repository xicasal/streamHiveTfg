
import { fetcherPost } from '@/lib/fetcher';
import { useState } from 'react'

interface VotingPanelProps {
  movieId: string
  onCancel: () => void
}

export function VotingPanel({ movieId, onCancel }: VotingPanelProps) {
  const [vote, setVote] = useState({ integer: 0, decimal: 0 });

  const handleIntegerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVote((prev) => ({ ...prev, integer: parseInt(e.target.value, 10) }));
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVote((prev) => ({ ...prev, decimal: parseInt(e.target.value, 10) }));
  };

  const handleSubmit = async () => {
    const finalVote = `${vote.integer}.${vote.decimal}`;
    console.log(`Voto a la película ${movieId}: ${finalVote}`);

    try {
      const response = await fetcherPost(`/api/movies/${movieId}/vote`, { rating: parseFloat(finalVote) })
      console.log('Respuesta de la votación:', response)
    } catch (error) {
      console.error('Error al realizar la votación:', error)
    }

    onCancel();
  }

  return (
    <div className="fixed inset-0 bg-zinc-800 bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-zinc-800 p-6 rounded-md text-center border-2 border-amber-600 shadow-md shadow-amber-400">
        <h2 className="text-xl font-bold text-amber-400 mb-4">Puntuar Película</h2>
        <div className="flex justify-center gap-4 mb-4">
          <select
            value={vote.integer}
            onChange={handleIntegerChange}
            className="bg-zinc-800 text-amber-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span className="text-amber-50 text-xl">.</span>
          <select
            value={vote.decimal}
            onChange={handleDecimalChange}
            className="bg-zinc-800 text-amber-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-row justify-center gap-4 mt-4">
          <button 
            onClick={handleSubmit}
            className="bg-amber-400 text-zinc-800 px-4 py-2 rounded-md hover:bg-amber-500 transition"
          >
            Enviar
          </button>
          <button 
            onClick={onCancel}
            className="bg-zinc-700 text-amber-50 px-4 py-2 rounded-md hover:bg-zinc-600 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}