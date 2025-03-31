import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/slices/authSlice';
import { toast } from 'sonner';

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


    useEffect(() => {
        if (error && error.message) {
            toast.error('Email đã tồn tại', { position: 'top-left' });
        }
    }, [error])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !password) {
            toast.error('Vui lòng nhập đày đủ thống tin', { position: 'top-left' });
            return;
        }
        dispatch(registerUser({ name, email, password }));
    }

    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-2'>
                        <h2 className='text-xl font-medium'>CASIO</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>
                        Đăng ký
                    </h2>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>
                            Tên
                        </label>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Nhập tên đầy đủ'
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
                            placeholder='Nhập email của bạn'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>
                            Mật khẩu
                        </label>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Nhập mật khẩu'
                        />
                    </div>
                    <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>{loading ? "Đang đăng ký..." : "Đăng ký"}</button>
                    <p className='mt-6 text-center text-sm'>
                        Bạn đã có tài khoản rồi?{" "}
                        <Link to={'/login'} className='text-blue-500 hover:underline'>Đăng nhập</Link>
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
