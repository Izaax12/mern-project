//import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { useState } from 'react'

function SignUp() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({ ...formData, [e.target.id]:e.target.value.trim() });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Porfavor completa los campos faltantes!');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method: 'POST', 
        headers:{'Content-Type': 'application/json'}, 
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
          <p className='text-sm mt-5'>Museo dedicado a persevar la memoria de la computacion dentro de México, el IPN y ESCOM</p>
        </div>

        {/*Right*/}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
            <div>
              <Label value="Tu usuario: "/>
              <TextInput type='text' placeholder = 'Usuario' id = 'username' onChange={handleChange}/>
            </div>
            <div>
              <Label value="Tu correo: "/>
              <TextInput type='email' placeholder = 'nombre@compañia' id = 'email' onChange={handleChange}/>
            </div>
            <div>
              <Label value="Tu contraseña: "/>
              <TextInput type='password' placeholder = 'Contraseña' id = 'password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                          <>
                            <Spinner size='sm'/>
                            <span className='pl-3'>Cargando...</span>
                          </>
                          ) : 'Sign Up'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Ya tienes una cuenta?</span>
            <Link to='/sign-in' className='text-to-blue-500'>Sign in</Link>
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

export default SignUp