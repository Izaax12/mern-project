import { Navbar, TextInput, Button } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import React from 'react'

function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-500'>Alirob</span>
            ESCOM
        </Link>
        <form>
          <TextInput
            type='text'
            placeholder='Búsqueda...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
          />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'>
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
            <FaMoon />
            </Button>
          <Link to = "/signin">
            <Button gradientDuoTone='purpleToBlue'>
             Sign In
            </Button>
          </Link>
          <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>

            <Navbar.Link active={path === '/'} as={'div'}>
              <Link to ="/">
                Home
              </Link>
            </Navbar.Link>

            <Navbar.Link active={path === '/About'} as={'div'}>
              <Link to = "/About">
                About
              </Link>
            </Navbar.Link>

            <Navbar.Link active={path === '/Projects'} as={'div'}>
              <Link to = "/Projects">
                Projects
              </Link>
            </Navbar.Link>
            
          </Navbar.Collapse>
    </Navbar>
  )
}

export default Header