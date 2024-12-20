'use client'

import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'

export default function CategoriesPage() {

  const router = useRouter()

  const categories = [
    { name: "Acción", size: "row-span-2 col-span-2", gradient: "from-red-500 to-red-400" },
    { name: "Aventura", size: "row-span-2 col-span-1", gradient: "from-blue-400 to-blue-300" },
    { name: "Comedia", size: "row-span-3 col-span-1", gradient: "from-yellow-400 to-yellow-300" },
    { name: "Documental", size: "row-span-3 col-span-1", gradient: "from-green-500 to-green-400" },
    { name: "Drama", size: "row-span-2 col-span-1", gradient: "from-purple-500 to-purple-400" },
    { name: "Fantasía", size: "row-span-1 col-span-1", gradient: "from-pink-500 to-pink-400" },
    { name: "Terror", size: "row-span-2 col-span-2", gradient: "from-gray-700 to-gray-600" },
    { name: "Niños", size: "row-span-1 col-span-1", gradient: "from-teal-500 to-teal-400" },
    { name: "Misterio", size: "row-span-1 col-span-1", gradient: "from-indigo-500 to-indigo-400" },
    { name: "Suspense", size: "row-span-3 col-span-2", gradient: "from-orange-500 to-orange-400" },
    { name: "Romance", size: "row-span-3 col-span-1", gradient: "from-rose-500 to-rose-400" },
    { name: "Ciencia ficción", size: "row-span-2 col-span-1", gradient: "from-cyan-500 to-cyan-400" },
  ]

  const handleCategorySelection = (categoryName: string) => {
    console.log(`Categoría seleccionada: ${categoryName}`)
    router.push(`/categories/${categoryName}`)
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-zinc-900 text-amber-50 p-10">
      <h1 className="text-3xl font-bold mb-6 mt-10">Categorías</h1>
      <div className="grid grid-cols-4 auto-rows-[100px] gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategorySelection(category.name)}
            className={`${category.size} bg-gradient-to-br ${category.gradient} shadow-md shadow-zinc-700 hover:opacity-90 transition rounded-lg flex items-center justify-center hover:scale-105 text-center text-xl font-semibold cursor-pointer`}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
