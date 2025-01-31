import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: '', username: '', password: '' })
  const [passwordArray, setPasswordArray] = useState([])
  const [edited, setEdited] = useState(false);
  const passwordRef = useRef();
  const editRef = useRef();
  const deleteRef = useRef();
  useEffect(() => {
    let passwords = localStorage.getItem('passwords');
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showpassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "../public/close.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "../public/eye.png";
    }
  };


  const savepassword = () => {
    if (!form.site || !form.username || !form.password) {
      alert("All fields are required!");
      return;
    }

    const newPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(newPasswords);
    localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
    setForm({ site: '', username: '', password: '' });

    let msg = "Password Saved Successfully!";
    if (edited) {
      msg = "Password Edited Successfully!";
      setEdited(false);
    }

    toast(msg, {
      position: "top-right",
      autoClose: 2400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  }

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const editPassword = (id) => {
    setEdited(true);
    const editPassword = passwordArray.find((item) => item.id === id);
    setForm(editPassword);
    editRef.current.style.display = 'block';
    deleteRef.current.style.display = 'none';
    console.log("edit", id);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem('passwords', JSON.stringify(passwordArray.filter((item) => item.id !== id)));
  }

  const deletePassword = (id) => {

    toast('Password Deleted Successfully!', {
      position: "top-right",
      autoClose: 2400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

    c = confirm("Do u really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem('passwords', JSON.stringify(passwordArray.filter((item) => item.id !== id)));
      console.log("delete", id);
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-[-2] h-full w-full rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(120,100%,90%,0)_0,rgba(144,238,144,0.3)_100%)]"></div>

      <div className=" mycontainer w-10/12">
        <h1 className='text-3xl font-bold text-center'>
          <span className='text-green-700 '>&lt;</span>
          <span>Pass</span>
          <span className='text-green-700 '>OP/ &gt;</span>
        </h1>
        <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>


        <div className='flex flex-col p-4 gap-8 text-black items-center'>
          <input className="rounded-full border-2 border-green-700 w-full p-2 py-1"
            type="text" name='site' placeholder='Enter Website URL' value={form.site}
            onChange={handlechange} />

          <div className="flex w-full justify-between gap-8">
            <input className="rounded-full border-2 border-green-700 w-[60%] p-2 py-1"
              type="text" name='username' placeholder='Enter Username' value={form.username}
              onChange={handlechange} />

            <div className="relative">
              <input ref={passwordRef} className="rounded-full border-2 border-green-700 w-[300px] p-2 py-1"
                type="password" name="password" placeholder="Enter Password" value={form.password}
                onChange={handlechange}
              />

              <span className='absolute right-3 top-1 cursor-pointer' onClick={showpassword}>
                <img ref={ref} src="../public/eye.png" alt="" width={28} />
              </span>

            </div>

          </div>

          <button className='flex gap-4 justify-center items-center bg-green-500 text-white rounded-full p-2 py-1 min-w-[200px]
          border-4 border-x-2 border-x-green-900
          transition duration-300 ease-in-out hover:bg-green-700 hover:scale-105 hover:shadow-lg'
            onClick={savepassword}>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save Password
          </button>

        </div>
        <div className="passwords">
          <h2 className='font-bold text-xl py-4'>Your Passwords</h2>

          {passwordArray.length === 0 ? (
            <div>No Passwords to show</div>
          ) : (
            <div>Your Passwords</div>
          )}

{passwordArray.length === 0 ? (
  <div>No Passwords to show</div>
) : (
  <div>Your Passwords</div>
)}

{passwordArray.length !== 0 && (
  <div className="border border-gray-300 rounded-md max-h-[350px] overflow-y-auto">
    <table className="table-auto w-full">
      <thead className="bg-green-700 text-white sticky top-0">
        <tr>
          <th className="py-2">Site</th>
          <th className="py-2">Username</th>
          <th className="py-2">Password</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="text-center bg-green-100">
        {passwordArray.map((item) => (
          <tr key={item.id}>
            <td className="p-2 px-4 border border-white text-center">
              <a href={item.site} target="_blank" rel="noopener noreferrer">
                {item.site}
              </a>
            </td>
            <td className="p-2 border border-white">{item.username}</td>
            <td className="p-2 border border-white">{item.password}</td>
            <td className="py-3 border border-white">
              <div className="flex gap-3 justify-center">
                <lord-icon
                  src="https://cdn.lordicon.com/gwlusjdu.json"
                  trigger="hover"
                  style={{ height: "25px", width: "25px", cursor: "pointer" }}
                  onClick={() => editPassword(item.id)}
                ></lord-icon>
                <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger="hover"
                  style={{ height: "25px", width: "25px", cursor: "pointer" }}
                  onClick={() => deletePassword(item.id)}
                ></lord-icon>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        </div>
      </div>
    </div>
  )
}

export default Manager