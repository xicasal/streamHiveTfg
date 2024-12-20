
import { useRouter } from 'next/navigation'

interface ShortScreenMenuProps {
  visible: boolean
}

export default function ShortScreenMenu({ visible }: ShortScreenMenuProps) {

  const router = useRouter()
  
  if (!visible) return null

  return (
    <div
      role="menu"
      className="bg-zinc-800 w-52 absolute top-12 left-0 py-5 flex-col border-2 border-amber-600 rounded-xl flex"
    >

      <div className="flex flex-col gap-6">

        <div
          onClick={() => router.push('/')} 
          className="px-3 text-center text-white hover:text-amber-600 hover:scale-125"
        >
          Inicio
        </div>

        <div 
          onClick={() => router.push('/movies')}
          className="px-3 text-center text-white hover:text-amber-600 hover:scale-125"
        >
          Películas
        </div>

        <div 
          onClick={() => router.push('/my-list')}
          className="px-3 text-center text-white hover:text-amber-600 hover:scale-125"
        >
          Mi lista
        </div>

      </div>
    </div>
  )
}
