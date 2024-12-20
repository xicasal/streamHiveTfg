'use client'

import Input from '@/components/Input'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const AuthPage = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
  }, [])


  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email, 
        password,
        callbackUrl: '/profiles',
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, password])


  const register = useCallback(async () => {
    if (!email || !password || !name) {
      return alert('Por favor, rellena todos los campos')
    }

    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      })

      login()

    } catch (error) {
      console.error(error)
    }
  }, [email, name, password, login])




  return (
    
    <div className="relative min-h-screen w-full bg-[url('/images/fondo.jpg')] bg-no-repeat bg-center bg-cover">
      
      <div className="w-full h-full">
        
        <nav className="px-12 py-5">
          <img src="/images/streamHiveLogo.png" alt="Logo" className="h-36"/>
        </nav>


        <div className="flex justify-center">
          
          <div className="bg-amber-100 bg-opacity-70 px-16 py-16 self-center mt-2 mx-4 lg:w-2/5 lg:max-w-md rounded-3xl w-full">

            <h2 className="text-black text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </h2>

            <div className="flex flex-col gap-4">

            {variant === 'register' && (
              <Input 
                id="name"
                onChange={(event: any) => setName(event.target.value)}
                label="Nombre"
                value={name}
              />
            )}

              <Input 
                id="email"
                onChange={(event: any) => setEmail(event.target.value)}
                label="Email"
                type="email"
                value={email}
              />

              <Input 
                id="password"
                onChange={(event: any) => setPassword(event.target.value)}
                label="Contraseña"
                type="password"
                value={password}
              />

            </div>

            <button 
              onClick={variant === 'login' ? login : register} 
              className="bg-amber-400 py-3 text-black rounded-md w-full mt-10 hover:bg-amber-500 transition"
            >
              {variant === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">

              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30}/>
              </div>

              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} color='white'/>
              </div>

            </div>

            <p className="text-neutral-700 mt-12">
              {variant === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <span 
                className="text-zinc-950 ml-1 hover:underline cursor-pointer text-xl"
                onClick={toggleVariant}
              >
                {variant === 'login' ? 'Regístrate' : 'Inicia sesión'}
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
