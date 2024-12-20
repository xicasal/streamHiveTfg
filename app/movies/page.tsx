'use client'

import ShowLoading from "@/components/loadingComponent/ShowLoading";
import Navbar from "@/components/Navbar";
import NavigationCarousel from "@/components/NavigationCarousel";
import useCategory from "@/hooks/useCategory";
import { useRouter } from "next/navigation";

export default function MoviesPage() {

  // Si hubiera más películas, habría que restringir el número de películas a mostrar

  const router = useRouter()

  const { data: actionMovies, isLoading: isLoadingActionMovies } = useCategory('Acción')
  const { data: aventureMovies, isLoading: isLoadingAventureMovies } = useCategory('Aventura')
  const { data: comedyMovies, isLoading: isLoadingComedyMovies } = useCategory('Comedia')
  const { data: documentalMovies, isLoading: isLoadingDocumentalMovies } = useCategory('Documental')
  const { data: dramaMovies, isLoading: isLoadingDramaMovies } = useCategory('Drama')
  const { data: fantasyMovies, isLoading: isLoadingFantasyMovies } = useCategory('Fantasía')
  const { data: horrorMovies, isLoading: isLoadingHorrorMovies } = useCategory('Terror')
  const { data: childrenMovies, isLoading: isLoadingChildrenMovies } = useCategory('Niños')
  const { data: misteryMovies, isLoading: isLoadingMisteryMovies } = useCategory('Misterio')
  const { data: suspenseMovies, isLoading: isLoadingSuspenseMovies } = useCategory('Suspense')
  const { data: romanceMovies, isLoading: isLoadingRomanceMovies } = useCategory('Romance')
  const { data: scienceFictionMovies, isLoading: isLoadingScienceFictionMovies } = useCategory('Ciencia ficción')

  if (isLoadingActionMovies || isLoadingAventureMovies || isLoadingComedyMovies || isLoadingDocumentalMovies || isLoadingDramaMovies || isLoadingFantasyMovies || isLoadingHorrorMovies || isLoadingChildrenMovies || isLoadingMisteryMovies || isLoadingSuspenseMovies || isLoadingRomanceMovies || isLoadingScienceFictionMovies) {
    return (
      <ShowLoading />
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />

      <div className="p-10 text-amber-50 mt-10">
        <div className="mb-10">
          <NavigationCarousel title="Películas de acción" data={actionMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Acción')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de aventura" data={aventureMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Aventura')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de comedia" data={comedyMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Comedia')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de documental" data={documentalMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Documental')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de drama" data={dramaMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Drama')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de fantasía" data={fantasyMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Fantasía')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de terror" data={horrorMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Terror')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de niños" data={childrenMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Niños')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de misterio" data={misteryMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Misterio')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de suspense" data={suspenseMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Suspense')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de romance" data={romanceMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Romance')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

        <div className="mb-10">
          <NavigationCarousel title="Películas de ciencia ficción" data={scienceFictionMovies} />
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/categories/Ciencia ficción')}
              className="bg-amber-50 text-zinc-900 text-xl border-2 border-amber-600 shadow-sm shadow-amber-600 px-4 py-2 rounded hover:bg-zinc-800 hover:text-amber-600 hover:scale-110 transition"
            >
              Mostrar más
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
