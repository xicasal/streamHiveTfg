'use client'

import { BsChevronDown } from 'react-icons/bs'
import NavbarItem from './NavbarItem'
import ShortScreenMenu from './shortScreenMenu/ShortScreenMenu'
import { useCallback, useEffect, useState } from 'react'
import AccountMenu from './AccountMenu'
import useCurrentUser from '@/hooks/useCurrentUser'
import { BiSolidCategory } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import SearchButton from './SearchButton'
import { CiSettings } from 'react-icons/ci'


const TOP_OFFSET = 66


export default function Navbar() {

  const router = useRouter()
  const { data: user } = useCurrentUser()

  const [showShortScreenMenu, setShowShortScreenMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  const adminUser = user?.role === 'admin'

  const toggleShortScreenMenu = useCallback(() => {
    setShowShortScreenMenu((current) => !current)
  }, [])

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current)
  }, [])


  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  
  return (
    <nav className="w-full fixed z-40">

      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-amber-400 bg-opacity-90 shadow-md shadow-amber-100' : ''}`}>

        <img 
          src="/images/streamHiveLogoMini.png"
          alt="Logo StreamHive" 
          className="h-12 cursor-pointer"
          onClick={() => router.push('/')}
        />

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          
          <div onClick={() => router.push('/')}>
            <NavbarItem label="Inicio"/>
          </div>
          <div onClick={() => router.push('/movies')}>
            <NavbarItem label="Películas"/>
          </div>
          <div onClick={() => router.push('/my-list')}>
            <NavbarItem label="Mi lista"/>
          </div>

        </div>

        <div 
          onClick={toggleShortScreenMenu} 
          className="lg:hidden flex flex-row px-4 py-2 items-center gap-2 ml-8 cursor-pointer relative bg-gray-600 bg-opacity-10 rounded-lg transition hover:bg-zinc-800 hover:rounded-lg hover:shadow-md hover:shadow-amber-600 group"
        >
          <p className="text-amber-50 text-lg group-hover:text-amber-600 transition">
            Menú
          </p>
          <BsChevronDown className={`text-white transition group-hover:text-amber-600 ${showShortScreenMenu ? 'rotate-180' : 'rotate-0'}`}/>
          <ShortScreenMenu visible={showShortScreenMenu}/>
        </div>


        <div className="flex flex-row ml-auto gap-4 items-center">
          
          <SearchButton/>

          <div
            onClick={() => router.push('/categories')}
            className="w-10 h-10 text-amber-600 bg-amber-100 hexagon hover:text-amber-600 hover:bg-zinc-800 cursor-pointer transition hover:scale-125 flex justify-center items-center"
          >
            <BiSolidCategory size={20}/>
          </div>

          {adminUser && (
            <div
              onClick={() => router.push('/admin')}
              className="w-10 h-10 text-amber-600 bg-amber-100 hexagon hover:text-amber-600 hover:bg-zinc-800 cursor-pointer transition hover:scale-125 flex justify-center items-center"
            >
              <CiSettings size={25}/>
            </div>
          )}

          <div 
            className="relative"
            onClick={toggleAccountMenu}
          >
            <div 
              className="w-10 h-10 hexagon cursor-pointer overflow-hidden transition hover:scale-125"
            >
              <img 
                src={user?.photoProfile} 
                alt="Profile" 
              />
            </div>

            {showAccountMenu && (
              
                <AccountMenu visible={showAccountMenu}/>
              
            )}
          </div>

        </div>

      </div>

    </nav>
  )
}