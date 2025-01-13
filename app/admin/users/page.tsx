'use client'

import ShowLoading from '@/components/loadingComponent/ShowLoading'
import Navbar from '@/components/Navbar'
import useAdminUsers from '@/hooks/useAdminUsers'
import useCurrentUser from '@/hooks/useCurrentUser'
import { fetcherDelete, fetcherPost } from '@/lib/fetcher'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

interface User {
  id: string
  name: string
  image?: string
  email?: string
  emailVerified?: Date
  hashedPassword?: string
  createdAt: Date
  updatedAt: Date
  favoriteIds: string[]
  photoProfile?: string
  userName?: string
  role: string
}

export default function AdminUsersPage() {

  const { data: users, isLoading: isLoadingUsers, mutate} = useAdminUsers()
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser()
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState('user')
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchUser, setSearchUser] = useState('')

  if (currentUser?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="p-4 text-white text-3xl font-bold">No tienes permisos para acceder a esta página</h1>
      </div>
    )
  }

  const handleEditClick = (user: User) => {
    setEditingUser(user)
    setSelectedRole(user.role)
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value)
  }

  const handleEditSave = async () => {
    if (editingUser) {
      try {
        await fetcherPost('/api/admin-users/update-role', {
          userId: editingUser.id,
          newRole: selectedRole
        })

        mutate()
        setEditingUser(null)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleDeleteClick = (user: User) => {
    setDeletingUser(user)
  }

  const handleConfirmDelete = async () => {
    if (deletingUser) {
      console.log('Se va a eliminar el usuario', deletingUser.id)
      setIsDeleting(true)
      try {
        await fetcherDelete(`/api/admin-users/delete/${deletingUser.id}`)
        mutate()
        setDeletingUser(null)
      } catch (error) {
        console.error(error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  if (isLoadingUsers || isLoadingCurrentUser) {
    return (
      <ShowLoading />
    )
  }

  const filteredAndSortedUsers = users?.filter((user: { name: string }) => 
    user.name.toLowerCase().includes(searchUser.toLowerCase())
  )
  .sort((a: User, b: User) => a.name.localeCompare(b.name))

  return (
    <div className="flex flex-col min-h-screen">
          
      <Navbar />
    
      <div className="p-10 text-amber-50 mt-24 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Gestión de usuarios
        </h1>
      </div>

      <div className="flex justify-center mb-1">
          <input 
            type="text"
            placeholder="Búsqueda por nombre..."
            value={searchUser}
            onChange={(event) => setSearchUser(event.target.value)}
            className="p-2 border rounded"
          />
        </div>

      <div className="container mx-auto p-8 bg-amber-600 text-amber-50 rounded-lg">
        <ul className="w-full">
          <li className="p-2 border-b border-zinc-800 font-bold grid grid-cols-3 text-center">
            <span className="text-left">Nombre</span>
            <span>Rol</span>
            <span className="text-right">Opciones</span>
          </li>
          {filteredAndSortedUsers?.map((user: User) => (
            <li key={user.id} className="p-2 border-b border-zinc-800 grid grid-cols-3 text-center">
              <span className="text-left">{user.name}</span>
              <span>{user.role}</span>
              <span className="text-right flex justify-end gap-2">
                <button 
                  onClick={() => handleEditClick(user)}
                  className="p-1 bg-zinc-800 rounded"
                >
                  <FaRegEdit />
                </button>

                <button 
                  onClick={() => handleDeleteClick(user)}
                  className="p-1 bg-red-800 rounded"
                >
                  <MdDelete />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-800 bg-opacity-50">
          <div className="bg-amber-50 p-6 rounded-lg shadow-lg text-zinc-900">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <p className="mb-4">Cambiando rol para: {editingUser.name}</p>
            <select 
              value={selectedRole} 
              onChange={handleRoleChange} 
              className="p-2  border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="mt-4 flex justify-center gap-2">
              <button 
                onClick={() => setEditingUser(null)} 
                className="p-2 bg-zinc-500 rounded"
              >
                Cancelar
              </button>
              <button 
                onClick={handleEditSave} 
                className="p-2 bg-amber-600 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-800 bg-opacity-50">
          <div className="bg-amber-50 p-6 rounded-lg shadow-lg text-zinc-900">
            <h2 className="text-xl font-bold mb-4">Eliminar Usuario</h2>
            <p className="mb-4">¿Estás seguro de que quieres eliminar a {deletingUser.name}?</p>
            <div className="mt-4 flex justify-center gap-2">
              <button 
                onClick={() => setDeletingUser(null)} 
                className="p-2 bg-zinc-500 rounded"
              >
                Cancelar
              </button>

              <button 
                onClick={handleConfirmDelete} 
                className="p-2 bg-red-600 rounded flex items-center justify-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <svg className="animate-spin h-5 w-5 mr-1 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
