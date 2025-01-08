
import useCurrentUser from '@/hooks/useCurrentUser'
import { Key, useState } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import ShowLoading from '../loadingComponent/ShowLoading'
import { fetcherDelete, fetcherPost } from '@/lib/fetcher'
import useCommentsByMovie from '@/hooks/useCommentsByMovie'
import { TiDelete } from 'react-icons/ti'

interface CommentsProps {
  movieId: string;
}

interface Comment {
  id: string
  userId: string
  movieId: string
  comment: string
  createdAt: Date
  userName: string
}

export default function Comments({ movieId }: CommentsProps) {

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser()
  const { data: comments, isLoading: isLoadingComments, mutate } = useCommentsByMovie(movieId)
  
  const [newComment, setNewComment] = useState("")
  const [isAddingComment, setIsAddingComment] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null)
  const maxCharacters = 240

  const handleAddComment = () => {
    console.log(currentUser.id)
    setIsAddingComment(true)
  }

  const handleSaveComment = async () => {
    if (newComment === "") {
      alert("El comentario no puede estar vacío.")
      return
    } else {
      try {
        await fetcherPost('/api/comments/create', {
          movieId,
          userId: currentUser.id,
          comment: newComment,
          userName: currentUser.name
        })
        mutate()
        setIsAddingComment(false)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const confirmDeleteComment = (comment: Comment) => {
    setCommentToDelete(comment)
  }

  const handleDeleteComment = async () => {
    try {
      console.log(commentToDelete?.id)
      await fetcherDelete(`/api/comments/delete/${commentToDelete?.id}`)
      mutate()
      setCommentToDelete(null)
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoadingCurrentUser || isLoadingComments) {
    return (
      <ShowLoading />
    )
  }

  return (
    <div className="bg-zinc-700 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-amber-400 underline underline-offset-2">Comentarios</h2>
        <button 
          className="text-amber-600 text-3xl hover:text-amber-400 hover:scale-110 transition"
          onClick={() => handleAddComment()}
        >
          <IoIosAddCircle />
        </button>
      </div>
      
      <div className="mt-4 space-y-2">
        {comments && comments.length > 0 ? (
          comments.map((comment: Comment, index: Key | null | undefined) => (
            <div key={index} className="p-2 bg-zinc-800 rounded relative">
              <div className="p-1 bg-amber-600 mb-1 flex justify-between items-center">
                <p className="text-sm text-zinc-900 font-semibold">{comment.userName}</p>
                {(currentUser?.id === comment.userId || currentUser?.role === 'admin') && (
                  <button 
                    onClick={() => confirmDeleteComment(comment)}
                    className="text-red-800 hover:text-red-700"
                  >
                    <TiDelete size={28} />
                  </button>
                )}
              </div>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Aún no hay comentarios</p>
        )}
      </div>

      {isAddingComment && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50">
          <div className="w-3/4 bg-amber-50 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-zinc-800 mb-4">Agregar Comentario</h2>
            <textarea 
              className="w-full text-zinc-800 p-2 border border-gray-300 rounded" 
              placeholder="Escribe tu comentario..."
              value={newComment} 
              onChange={(e) => {
                if (e.target.value.length <= maxCharacters) {
                  setNewComment(e.target.value);
                }
              }}
            ></textarea>
            <p className="text-sm text-gray-600">{newComment.length}/{maxCharacters} caracteres</p>
            <div className="flex justify-center gap-4 mt-4">
              <button 
                onClick={() => setIsAddingComment(false)} 
                className="p-2 bg-gray-500 rounded text-amber-50"
              >
                Cancelar
              </button>

              <button 
                onClick={handleSaveComment} 
                className="p-2 bg-amber-600 rounded text-amber-50"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {commentToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50">
          <div className="w-3/4 bg-amber-50 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-zinc-800 mb-4">Eliminar Comentario</h2>
            <p className="mb-4 text-zinc-800">¿Estás seguro de que deseas eliminar este comentario?</p>
            <p className="text-gray-700">"{commentToDelete.comment}"</p>
            <div className="flex justify-center gap-4 mt-4">
              <button 
                onClick={() => setCommentToDelete(null)} 
                className="p-2 bg-gray-500 rounded text-amber-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDeleteComment} 
                className="p-2 bg-red-600 rounded text-amber-50"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
