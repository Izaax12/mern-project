import React from 'react'
import { Link } from 'react-router-dom'
import { Label, TextInput, Button } from 'flowbite-react'

function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*Left*/}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-500 rounded-lg'>Alirob</span>
              ESCOM
          </Link>
          <p className='text-sm mt-5'>Museo dedicado a persevar la memoria de la computacion dentro de México, el IPN y ESCOM</p>
        </div>
        {/*Right*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value="Tu usuario: "/>
              <TextInput type='text' placeholder = 'Usuario' id = 'username' />
            </div>
            <div>
              <Label value="Your correo: "/>
              <TextInput type='text' placeholder = 'nombre@compañia' id = 'email' />
            </div>
            <div>
              <Label value="Tu contraseña: "/>
              <TextInput type='text' placeholder = 'Contraseña' id = 'password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Ya tienes una cuenta?</span>
            <Link to='/sign-in' className='text-to-blue-500'>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp