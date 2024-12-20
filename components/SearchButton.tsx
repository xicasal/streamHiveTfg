

import { useRouter } from 'next/navigation'
import { SetStateAction, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

export default function SearchButton() {

  const router = useRouter()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTarget, setSearchTarget] = useState('')

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchTarget(event.target.value);
  }

  const handleSearchSubmit = () => {
    if(searchTarget !== '') {
      router.push(`/search/${searchTarget}`)
    }
  }

  return (
    <div className="relative">
      <div
        onClick={handleSearchToggle}
        className="w-10 h-10 text-amber-600 bg-amber-100 hexagon hover:bg-zinc-800 cursor-pointer transition hover:scale-125 flex justify-center items-center"
      >
        <BsSearch />
      </div>

      {isSearchOpen && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-zinc-800 bg-opacity-60 text-black p-2 w-64 rounded-md shadow-lg">
          <input
            type="text"
            value={searchTarget}
            onChange={handleSearchChange}
            placeholder=""
            className="w-full border border-zinc-800 bg-zinc-50 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring focus:ring-amber-600"
          />
          <button
            onClick={handleSearchSubmit}
            className="w-full bg-amber-100 text-amber-600 text-lg px-4 py-2 rounded-md hover:bg-zinc-800 hover:scale-105 transition"
          >
            Buscar
          </button>
        </div>
      )}
    </div>
  )
}
