import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../baseUrl'

const User = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({username: '', email: ''})
    const [editingId, setEditingId] = useState(null)
    const [showModedEdit, setShowModelEdit] = useState(false) 


    useEffect(() => {
    const getUsers = async () => {
      try {
        // 1. Check localStorage first
        const savedUsers = localStorage.getItem("users");

        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
          return;
        }

        // 2. If localStorage is empty, fetch from API
        const response = await axios.get(`${baseUrl}/users`);

        console.log("API response:", response.data);

        // 3. Save API users to state
        setUsers(response.data);

        // 4. Save API users to localStorage
        localStorage.setItem(
          "users",
          JSON.stringify(response.data)
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

    // Save changes to localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);


    // Delete User
    const deleteUser = async (id) => {
        try {
           await axios.delete(`${baseUrl}/users/${id}`)
           setUsers( users.filter((user) => user.id !== id))
            alert('User Deleted')
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    // Update User

    const updateUser = async () => {
        setLoading(true)
        try {
            await axios.put(`${baseUrl}/users/${editingId}`, form)
            const updateUser = {...form, id: editingId}
            setUsers(users.map((user) => user.id === editingId ? updateUser : user))
            setForm({username: '' , email: ''})
            setShowModelEdit(false)
            alert('User updated successfully')
        } catch (error) {
            console.log(error);
            
        } finally{
            setLoading(false)
        }
    }

    // Add User

    const addUser = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${baseUrl}/users`, form)
            const newUser = {...form, id: res.data.id || Date.now()}
            setUsers([...users, newUser])
            setForm({username: '' , email: ''})
         
        } catch (error) {
            console.log(error);
            
        } finally{
            setLoading(false)
        }
    }

      if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm uppercase tracking-widest">
          Loading users...
        </p>
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-[#f7f7f7] px-5 py-10 sm:px-8 md:px-10 lg:px-12">

      <div className="mx-auto max-w-6xl">

        {/* =================================
            HEADER
        ================================== */}

        <div className="mb-8">

          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
            Dashboard / Users
          </p>

          <div className="flex items-end justify-between gap-4">

            <h1 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl md:text-6xl">
              Users
            </h1>

            <span className="hidden text-xs uppercase tracking-widest text-gray-500 sm:block">
              {users.length} Users
            </span>

          </div>

        </div>


        {/* =================================
            ADD / EDIT FORM
        ================================== */}

        <div className="border border-gray-300 bg-[#f7f7f7] p-5 sm:p-8">

          {/* Form Header */}

          <div className="mb-7 flex items-center justify-between">

            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                User Management
              </p>

              <h2 className="text-xl font-bold uppercase tracking-tight sm:text-2xl">
                Add user
              </h2>
            </div>
          </div>


          

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Username */}

              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest"
                >
                  Username
                </label>

                <input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({...form, username: e.target.value})}
                  placeholder="Enter username"
                  className="h-14 w-full border border-gray-300 bg-transparent px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </div>


              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-widest"
                >
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  placeholder="Enter email"
                  className="h-14 w-full border border-gray-300 bg-transparent px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </div>

            </div>


            {/* Submit */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

              <button
                onClick={addUser}
                className="h-12 bg-black px-10 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-gray-800"
              >
                Add user
              </button>

            </div>

          

        </div>


        {/* =================================
            USERS LIST HEADER
        ================================== */}

        <div className="mt-12 mb-5 flex items-end justify-between">

          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Database
            </p>

            <h2 className="text-xl font-bold uppercase tracking-tight sm:text-2xl">
              All Users
            </h2>
          </div>

          <span className="text-xs text-gray-500">
            {users.length} total
          </span>

        </div>


        {/* =================================
            USERS
        ================================== */}

        <div className="space-y-3">

          {users.map((user) => (
            <div
              key={user.id}
              className={'border bg-[#f7f7f7] p-5 transition'}
            >

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                {/* User Information */}

                <div className="min-w-0">

                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    User
                  </p>

                  <h3 className="break-words text-base font-semibold tracking-tight sm:text-lg">
                    {user.username}
                  </h3>

                  <p className="mt-1 break-all text-sm text-gray-500">
                    {user.email}
                  </p>

                </div>


                {/* Actions */}

                <div className="flex w-full gap-2 sm:w-auto">

                  <button
                    type="button"
                      onClick={() => {
                        setShowModelEdit(true)
                        setEditingId(user.id)
                        setForm({username: user.username, email: user.email})
                    }}
                    className="h-10 flex-1 border border-gray-300 px-5 text-xs font-medium uppercase tracking-widest transition hover:border-black hover:bg-black hover:text-white sm:flex-none"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteUser(user.id)}
                    className="h-10 flex-1 border border-black bg-black px-5 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-transparent hover:text-black sm:flex-none"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

         {showModedEdit && (
        <div className='fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] border-2  bg-amber-50 h-auto p-4'>
                <h2 className='text-center'>Update User</h2>

                <input type="text" 
                className='border w-full my-2 px-2'
                placeholder='UserName' 
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})} />

                <input type="email" 
                className='border w-full my-2 px-2'
                placeholder='Email'
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})} />

                <div className='flex justify-between '>
                    <button onClick={updateUser}>Update</button>
                    <button onClick={() => setShowModelEdit(false)}>Cancel</button>
                </div>
        </div>
    )}


        {/* =================================
            EMPTY STATE
        ================================== */}

        {users.length === 0 && (
          <div className="border border-dashed border-gray-300 py-16 text-center">

            <p className="text-sm text-gray-500">
              No users found.
            </p>

          </div>
        )}

      </div>

    </section>
  )
}

export default User