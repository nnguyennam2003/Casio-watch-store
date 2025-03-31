import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/slices/authSlice'
import { toast } from 'sonner'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, role, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!loading && role) {
            if (role === "admin") {
                navigate("/admin")
            } else {
                navigate("/")
                toast.success("Đăng nhập thành công", {
                    position: 'bottom-right',
                })
            }
        }
    }, [loading, role, navigate])

    useEffect(() => {
        if (error && error.message) {
            toast.error('Email hoặc mật khẩu không đúng', { position: 'top-left' });
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error('Vui lòng nhập email và mật khẩu', { position: 'top-left' });
            return;
        }
        dispatch(loginUser({ email, password }))
    }

    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-3'>
                        <h2 className='text-xl font-medium'>CASIO</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>
                        Đăng nhập
                    </h2>
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
                    <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>{loading ? "Đang đăng nhập..." : "Đăng nhập"}</button>
                    <p className='mt-6 text-center text-sm'>
                        Bạn chưa có tài khoản?{" "}
                        <Link to={'/register'} className='text-blue-500 hover:underline'>Đăng ký</Link>
                    </p>
                </form>
            </div>

            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src="https://www.casio.com/content/casio/locales/vn/vi/products/_jcr_content/root/responsivegrid/container_1790102794/content_panel_list/content_panel_2021030223222084211/image.casiocoreimg.jpeg/1677474624173/gshock-brand-banner.jpeg"
                        className='h-[750px] w-full object-cover'
                        alt="image" />
                </div>
            </div>
        </div>
    )
}
