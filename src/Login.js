import React, { useCallback, useState } from 'react';
import { auth, db } from './firebase';
const Login = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = (e) => {
        e.preventDefault()
        if(!email.trim()){
            setError('Ingrese el email')
            return
        }
        if(!pass.trim()){
            setError('Ingrese la contraseña')
            return
        }
        if(pass.length < 6){
            setError('La contraseña debe contener minimo 6 caracteres')
            return
        }
        setError(null)
        if(esRegistro){
            registrar()
        }else{
            Login()
        }
    }

    const Login = useCallback(async() => {

        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
        } catch (error) {
            console.log(error)
            setError(error.message)
        }

    }, [email, pass])

    const registrar = useCallback(async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('usuarios').doc(res.user.uid).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPass('')
            setError(null)
            console.log(res.user)
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }, [email, pass])

    return (
        <div className='mt-5'>
            <h3 className='text-center'>
                {
                    esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                }
            </h3>
            <hr />
            <div className='row justify-content-center'>
                <div className='col-12 col-sm-8 col-md-6 col-xl-4'>
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div className='alert alert-danger'>
                                    {error}
                                </div>
                            )
                        }
                        <input 
                            type='email' 
                            className='form-control mb-4'
                            placeholder='Ingrese un email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type='password' 
                            className='form-control mb-4'
                            placeholder='Ingrese una contraseña'
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                        />
                        <button className='btn btn-dark btn-lg btn-block mb-2' style={{width: '100%'}} type='submit'>
                            {
                              esRegistro ? 'Registrarse' : 'Acceder'  
                            }
                        </button>
                        <button className='btn btn-info btn-sm btn-block' style={{width: '100%'}} onClick={() => setEsRegistro(!esRegistro)} type='button'>
                            {
                                esRegistro ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;