import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownItem } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
//import React from 'react'

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state=>state.user);
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-500 rounded-lg'>Alirob</span>
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
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
            <FaMoon />
          </Button>
          {currentUser ? (
              <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture}/>}>
                <Dropdown.Header>
                  <span className='block text-sm'>@{currentUser.username}</span>
                  <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                  <Dropdown.Item>Perfil</Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <DropdownItem>Cerrar Sesión</DropdownItem>
              </Dropdown>
            ):(
            <Link to = "/sign-in">
            <Button gradientDuoTone='purpleToBlue' outline>
              Iniciar Sesión
            </Button>
          </Link>
          )
          }
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