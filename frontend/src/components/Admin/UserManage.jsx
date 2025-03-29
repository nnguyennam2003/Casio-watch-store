import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeRoleUser, createUser, deleteUser, getListUsers } from '../../redux/slices/adminUser'

export default function UserManage() {
    const { users } = useSelector((state) => state.adminUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListUsers())

    }, [dispatch])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createUser(formData))
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "user"
        })
    }

    const handleRoleChange = (userId, newRole) => {
        console.log({ id: userId, role: newRole })
        dispatch(changeRoleUser({ userId, newRole }))
    }

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId))
    }

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-4'>
                User Management
            </h2>
            <div className='p-6 rounded-lg mb-6'>
                <h3 className='text-lg font-bold mb-4'>Add new user</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <button type='submit' className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer'>Create</button>
                </form>
            </div>

            <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className='py-3 px-4'>Name</th>
                            <th className='py-3 px-4'>Email</th>
                            <th className='py-3 px-4'>Role</th>
                            <th className='py-3 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className='border-b border-gray-200'>
                                <td className='p-4'>{user.name}</td>

                                <td className='p-4'>{user.email}</td>
                                <td className='p-4'>
                                    <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </td>
                                <td className='p-4'>
                                    <button onClick={() => handleDeleteUser(user._id)}
                                        className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer'
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
