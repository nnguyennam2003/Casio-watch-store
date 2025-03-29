import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/slices/authSlice';

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, userInfo, role } = useSelector((state) => state.auth);

    useEffect(() => {
        if (role) {
            navigate("/")
        }
    }, [role, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password }));
    }

    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium'>CASIO</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>
                        Hey there!
                    </h2>
                    <p className='text-center mb-6'>
                        Enter your email and password to login
                    </p>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>
                            Name
                        </label>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>
                            Email
                        </label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>
                            Password
                        </label>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your password'
                        />
                    </div>
                    <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>Sign up</button>
                    <p className='mt-6 text-center text-sm'>
                        You already have an account?{" "}
                        <Link to={'/login'} className='text-blue-500 hover:underline'>Sign in</Link>
                    </p>
                </form>
            </div>

            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src="https://www.casio.com/content/casio/locales/vn/vi/products/_jcr_content/root/responsivegrid/container_1450128435/carousel_copy_copy/image_1431869481_cop.casiocoreimg.jpeg/1721381310314/casio-24ss-web-1920pxx816px.jpeg"
                        className='h-[750px] w-full object-cover'
                        alt="image" />
                </div>
            </div>
        </div>
    )
}
