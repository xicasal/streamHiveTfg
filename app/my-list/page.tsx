'use client'

import ShowLoading from '@/components/loadingComponent/ShowLoading'
import Navbar from '@/components/Navbar'
import ShowMoviesByCols from '@/components/ShowMoviesByCols'
import useFavoritesAux from '@/hooks/useFavoritesAux'
import { MdOutlinePlaylistAdd, MdEdit, MdDelete } from 'react-icons/md'
import { useCallback, useState } from 'react'
import { fetcherDelete, fetcherPost } from '@/lib/fetcher'
import useCategoriesFromMyList from '@/hooks/useCategoriesFromMyList'
import MoviesByCategory from '@/components/MoviesByCategory'

const COLORS = [
  'bg-amber-400', 
  'bg-blue-400', 
  'bg-red-400', 
  'bg-pink-800', 
  'bg-purple-400',
  'bg-pink-400', 
  'bg-yellow-700', 
  'bg-emerald-500', 
  'bg-indigo-400', 
  'bg-cyan-400',
]

export default function MyListPage() {

  const { data: favorites, isLoading: favoriteLoading, mutate: favoritesMutate } = useFavoritesAux()
  const { data: categories, isLoading: categoriesLoading, mutate: categoriesMutate } = useCategoriesFromMyList()
  
  const [showPanel, setShowPanel] = useState(false)
  const [showPanelEdit, setShowPanelEdit] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showMaxCategoryPanel, setShowMaxCategoryPanel] = useState(false)
  const [categoryIdToDelete, setCategoryIdToDelete] = useState('')


  const handleMutate = useCallback(() => {
    favoritesMutate()
    categoriesMutate()
  }, [favoritesMutate, categoriesMutate])

  const handleAddCategory = () => {
    if (categories && categories.length >= 4) {
      setShowMaxCategoryPanel(true)
    } else {
      setShowPanel(true)
    }
  }

  const handleClosePanel = () => {
    setShowPanel(false)
    setShowPanelEdit(false)
    setCategoryId('')
    setTitle('')
    setColor(COLORS[0])
  }

  const handleSaveCategory = async () => {
    if (!title) {
      alert('Debes ingresar un título para la categoría')
    } else {
      try {
        await fetcherPost('api/my-list/categories', {
          title,
          color,
        })
        categoriesMutate()
      } catch (error) {
        console.log('Error al crear la categoría', error)
      }
      setTitle('')
      setColor(COLORS[0])
      setShowPanel(false)
    }
  }

  const handleOpenEditCategory = (category: any) => {
    console.log('Editando categoría:', category.id)
    setCategoryId(category.id)
    setTitle(category.name)
    setColor(category.color)
    setShowPanelEdit(true)
  }

  const handleEditCategory = async (categoryId: string) => {
    if (!title) {
      alert('Debes ingresar un título para la categoría')
    } else {
      try {
        await fetcherPost(`api/my-list/categories/update/${categoryId}`, {
          title,
          color,
        })
        categoriesMutate()
      } catch (error) {
        console.log('Error al crear la categoría', error)
      }
      console.log('Editando categoría:', categoryId)
      console.log('Nuevos cambios:', title, color)
      setTitle('')
      setColor(COLORS[0])
      setShowPanelEdit(false)
    }
  }


  const openDeleteConfirmation = (categoryId: string) => {
    setCategoryIdToDelete(categoryId)
    console.log('Borrar categoría:', categoryId)
    setShowConfirmDelete(true)
  }

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await fetcherDelete(`api/my-list/categories/delete/${categoryId}`)
      favoritesMutate()
      categoriesMutate()
      setCategoryIdToDelete('')
      setShowConfirmDelete(false)
    } catch (error) {
      console.log('Error al borrar la categoría', error)
    }
  }


  if (favoriteLoading || categoriesLoading) {
    return (
      <ShowLoading />
    )
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-zinc-800 text-amber-50 p-10 relative">
        <h1 className="text-3xl font-bold mb-8 mt-10">
          Películas de Mi lista
        </h1>
        <ShowMoviesByCols 
          movies={favorites} 
          labelNoResults="No hay películas en Mi lista" 
          isInMyList={true}
          onMutate={handleMutate}
        />

        {categories && categories.map((category: any) => (
          <div key={category.id} className={`mt-6 p-4 rounded-lg ${category.color} text-amber-50 relative`}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEditCategory(category)}
                  className="p-2 bg-zinc-800 hexagon hover:scale-110 transition"
                >
                  <MdEdit size={18} />
                </button>
                <button
                  onClick={() => openDeleteConfirmation(category.id)}
                  className="p-2 bg-zinc-700 text-red-500 hexagon hover:scale-110 transition"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
            <MoviesByCategory 
              categoryId={category.id} 
              labelNoResults="Aún no hay películas añadidas" 
              isInMyList={true}
              onMutate={handleMutate}
            />
          </div>
        ))}

        <div className="fixed bottom-8 right-8">
          <button
            className="hexagon bg-amber-100 hover:bg-zinc-900 text-amber-600 p-2 shadow-lg hover:scale-125 transition"
            onClick={handleAddCategory}
          >
            <MdOutlinePlaylistAdd size={26} />
          </button>
        </div>

        {showConfirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-zinc-100 p-6 rounded-lg shadow-lg w-80 text-zinc-900">
              <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
              <p className="mb-6">¿Estás seguro de que quieres eliminar esta categoría? Las películas se moverán a "Películas de Mi lista".</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeleteCategory(categoryIdToDelete)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {showMaxCategoryPanel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-red-100 p-6 rounded-lg shadow-lg w-80 text-red-900">
              <h2 className="text-xl font-bold mb-4">Límite de Categorías Alcanzado</h2>
              <p className="mb-6">Has alcanzado el número máximo de 4 categorías. Por favor, elimina una categoría existente para añadir una nueva.</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowMaxCategoryPanel(false)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {showPanel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-amber-50 p-8 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-bold mb-4 text-zinc-900">Añadir Categoría</h2>
              <label className="block mb-4">
                <span className="text-zinc-700 text-lg">Título</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded mt-1 text-zinc-800"
                  placeholder="Nombre de la categoría"
                />
              </label>
              <label className="block mb-6">
                <span className="text-zinc-700 text-lg">Color</span>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      className={`w-10 h-10 rounded-lg ${c} border-2 ${color === c ? 'border-black' : 'border-transparent'}`}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleClosePanel}
                  className="bg-gray-400 hover:bg-gray-500 hover:scale-110 text-amber-50 py-2 px-4 rounded transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCategory}
                  className="bg-zinc-800 hover:bg-zinc-900 hover:scale-110 text-amber-600 py-2 px-4 rounded transition"
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        )}

        {showPanelEdit && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-amber-50 p-8 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-bold mb-4 text-zinc-900">Editar Categoría</h2>
              <label className="block mb-4">
                <span className="text-zinc-700 text-lg">Título</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded mt-1 text-zinc-800"
                  placeholder="Nombre de la categoría"
                />
              </label>
              <label className="block mb-6">
                <span className="text-zinc-700 text-lg">Color</span>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      className={`w-10 h-10 rounded-lg ${c} border-2 ${color === c ? 'border-black' : 'border-transparent'}`}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleClosePanel}
                  className="bg-gray-400 hover:bg-gray-500 hover:scale-110 text-amber-50 py-2 px-4 rounded transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleEditCategory(categoryId)}
                  className="bg-zinc-800 hover:bg-zinc-900 hover:scale-110 text-amber-600 py-2 px-4 rounded transition"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
