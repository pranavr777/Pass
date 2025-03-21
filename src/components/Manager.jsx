
import React from 'react'
import { useRef, useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({site: "", username: "", password: ""})
  const [passwordArray, setPasswordArray] = useState([])

 const getPasswords = async () => {
  let req = await fetch("http://localhost:5173/")
    let passwords = await req.json()   
      console.log(passwords)
      setPasswordArray(passwords)
  }
  
  useEffect(() => {
    getPasswords()
  
   
  }, [])
  
 

  const showPassword = () => 
    {       
      passwordRef.current.type = "text"
      if(ref.current.src.includes("icons/view.png")){
        ref.current.src = "icons/hidden.png"
        passwordRef.current.type = "text"
      }
        else{
        ref.current.src = "icons/view.png"
        passwordRef.current.type = "password"
      }
     }
     const savePassword = async () => 
      { 
        await fetch("http://localhost:5173", {method: "DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({id: form.id})})
        setform({site: "", username: "", password: ""})

        setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {}]))
        // console.log([...passwordArray, form])
        await fetch("http://localhost:5173", {method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
        setform({site: "", username: "", password: ""})       
     
       }
          const deletePassword = async (id) => 
      { 
        let c = confirm("Are you sure you want to delete?")
        if (confirm)
          { 
           
          setPasswordArray(passwordArray.filter(item=>item.id !== id))      
          // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))   
          let res = await fetch("http://localhost:5173", {method: "DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({id})})
           setform({site: "", username: "", password: ""})
           
         
        }      
     
       }
       const editPassword = (id) =>
       {
        console.log("Editing password with id", id)
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        setPasswordArray(passwordArray.filter(item=>item.id !== id))
        
       }
       const handleChange = (e) =>
       {setform({...form, [e.target.name]: e.target.value})

       }
       const copyText = (text) => {  
        toast('🦄'+'"'+ text + '"' + " " + 'Copied to clipboard!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          
          });
    
        navigator.clipboard.writeText(text)
        
       }
      
       
      
  return (<>
  
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />
  <div className="py-2 border border-white absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="py-2 border border-white absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-600 opacity-20 blur-[100px]"></div></div>
 
  <div className="p-2 md:p-0 md:mycontainer max-w-6xl ">
    <h1 className='py-2 border border-white text-4xl text-center font-bold'><span className='py-2 border border-white text-green-600'>&lt;</span>Pass<span className='py-2 border border-white text-green-600'>OP/&gt;</span></h1>
    <p className='py-2 border border-white text-green-700 text-lg text-center'>Your own Password Manager</p>
  <div className='py-2 border border-white flex flex-col p-4 text-black gap-3 items-center'>
    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='py-2 border border-white rounded-full border border-green-500 w-full p-4 py-1' type='text' name='site' id='site'/>
    <div className="py-2 border border-white  flex flex-col md:flex-row w-full justify-between gap-8">
        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='py-2 border border-white rounded-full border border-green-500 w-full p-4 py-1' type='text' name='username' id='username'/>
        <div className='py-2 border border-white relative flex items-center'>
        <input ref={passwordRef} value={form.password} onChange={handleChange}  placeholder='Enter Password' className='py-2 border border-white rounded-full border border-green-500 w-full p-5 ' type='password' name='password' id='password'/>
        <span className='py-2 border border-white absolute right-2 cursor-pointer' onClick={showPassword}><img ref={ref}width={18} src='/icons/view.png' alt='Show'></img></span>
        </div>
               
    </div>
  
    <button onClick={savePassword} title='Add Password' className='flex justify-center items-center bg-green-500 rounded-full px-2 py-2 w-fit hover:bg-green-400'>  <lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover"
    colors="primary:#000000"
    >
</lord-icon></button>
  </div>
  <div className="py-2 border border-white passwords w-full">
    <h2 className='font-bold text-xl'>Your Passwords</h2>
    {passwordArray.length === 0 && <div>No passwords to show!</div>}
    {passwordArray.length != 0 &&
    <table className="py-2 border border-white table-auto w-full rounded-md overflow-hidden mb-10">
  <thead className='py-2 border border-white bg-green-800  text-white'>
    <tr>
      <th className='border border-white py-2'>Site</th>
      <th className='border border-white py-2'>Username</th>
      <th className='border-y-0 border-white py-2'>Password</th>
      <th></th>
    </tr>
  </thead>
  <tbody className='py-2 border border-white bg-green-100'>
    {passwordArray.map((item, index)=>{
      return <tr key={index}>
        <td className='py-2 border border-white text-center w-32'>
          <div className='flex justify-center items-center'>
          <a href={item.site} target='_blank'>{item.site}&nbsp;</a><div className='size-4 cursor-pointer' onClick={()=>copyText(item.site)}><img src='icons/copy.png' alt='copy' title='Copy'></img></div>
            </div></td>
      <td className=' py-2 border border-white text-center w-32'>
        <div className='flex justify-center items-center'><a>{item.username}&nbsp;</a><div className='size-4 cursor-pointer' onClick={()=>copyText(item.username)}><img src='icons/copy.png' title='Copy' alt='copy'></img></div></div></td>
      <td className='relative py-2 border-white text-center w-32'>
     
        <div className='flex items-center justify-center'>
        <a>{"*".repeat(item.password.length)}&nbsp; </a><div className='size-4 cursor-pointer' onClick={()=>copyText(item.password)}><img title='Copy' src='icons/copy.png' alt='copy'></img></div>          
          </div>          
          </td>
          <td className='w-10'>
            <div className='flex justify-end gap-1'>
            <span><img onClick={() => {editPassword(item.id)}}src='icons/edit.png' title='Edit' className='w-4 cursor-pointer'></img></span>
            <span><img onClick={() => {deletePassword(item.id)}} src='icons/delete.png' title='Delete' className='w-4 cursor-pointer'></img></span>
            </div>
         
          
          
          </td>
      </tr>
    })}
   
   
  </tbody>
</table>}

​

  </div>
 

  </div>
  
  </>
 )
}

export default Manager