//import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';

function SignIn() {

  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({ ...formData, [e.target.id]:e.target.value.trim() });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Porfavor completa todos los campos'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method: 'POST', 
        headers:{'Content-Type': 'application/json'}, 
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  //console.log(handleChange)

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

        {/*Left*/}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-500 rounded-lg'>Alirob</span>
              ESCOM
          </Link>
          <p className='text-sm mt-5'>Museo dedicado a persevar la memoria de la computación dentro de México, el IPN y ESCOM</p>
        </div>

        {/*Right*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
            <div>
              <Label value="Correo: "/>
              <TextInput type='email' placeholder = 'nombre@compañia' id = 'email' onChange={handleChange}/>
            </div>
            <div>
              <Label value="Contraseña: "/>
              <TextInput type='password' placeholder = '**********' id = 'password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (<>
                            <Spinner size='sm'/>
                            <span className='pl-3'>Cargando...</span>
                          </>
                          ) : 'Inicia Sesión'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>No tienes cuenta?</span>
            <Link to='/sign-up' className='text-to-blue-500'>Crear Cuenta</Link>
          </div>
          {
            errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>)
          }
        </div>

      </div>
    </div>
  )
}

export default SignIn