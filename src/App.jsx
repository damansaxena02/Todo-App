import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState();
  const [todos, settodos] = useState([]);
  const [showfinised, steshowfinised] = useState(true)
    useEffect(() => {
     let todostring = localStorage.getItem("todos")
     if(todostring){
       let todos =JSON.parse(localStorage.getItem("todos"))
       settodos(todos)
     } 

    }, [])
    
   const savetols =()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
   }
   const Togglefinised = () => { 
    steshowfinised(!showfinised)
    }


  const handleEdit = ( e, id) => {
    let t = todos.filter(item=>item.id === id)
    settodo(t[0].todo )
     let newtodos = todos.filter(item=>{
     return item.id!==id
   })
   settodos(newtodos)
     savetols()

    
  };
  const handleDel = (e,id) => {
    if (id==id) {
      alert("confirm ")
    }
   let newtodos = todos.filter(item=>{
     return item.id!==id
   })
   settodos(newtodos)
     savetols()

  };
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscom: false }]);
    settodo("");
     savetols()
   
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleCheck = (e) => { 
   let id = e.target.name;
   let index = todos.findIndex(item=>{
    return item.id === id;
   })
   
   let newtodos = [...todos]
   newtodos[index].iscom=!newtodos[index].iscom;
   settodos(newtodos)
     savetols()
   
   };
   
  return (
    <>
      <Navbar />
      <div className=" md:container md:mx-auto my-5 rounded-xl p-5 mx-3 bg-violet-100 min-h-[80vh] md:w-[45%]">
      <h1 className="font-bold text-center text-2xl">iTask - Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-3">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex"> 

          <input  onChange={handleChange} value={todo} className="bg-white w-full rounded-lg px-5 py-2"type="text" />
         <button onClick={handleAdd} disabled={todo<3} className="bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-3 py-2 font-bold text-sm text-white rounded-md mx-6"
          >
            Save
          </button>
            </div>
        </div>
        <input type="checkbox"  onChange={Togglefinised} checked={showfinised} name="" id="" />Show Finised
        <hr />
        <h2 className="text-xl font-bold my-3">Your Todo</h2>
        <div className="todos">
          {todos.length===0 && <div className="m-5">No Todos to display </div>}
          {todos.map((item) => {
            return (showfinised || !item.iscom)&&  (<div key={item.id} className="todo flex justify-between my-3">
              <div className="flex gap-5">

                <input onChange={handleCheck} name={item.id} type="checkbox" checked={item.iscom}  id="" />
              
                <div className={item.iscom ? "line-through" : ""}> {item.todo}</div>
              </div>
                <div className="button h-full flex">
                  <button
                    onClick={(e)=> {handleEdit(e,item.id)}}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-2 font-bold text-sm text-white rounded-md mx-1"
                  >
                  <FaEdit />
                  </button>
                  <button
                    onClick={(e)=>{handleDel (e,item.id)} }    className="bg-violet-800 hover:bg-violet-950 p-3 py-2 font-bold text-sm text-white rounded-md mx-1"
                  >
                 <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
