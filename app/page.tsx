"use client";
import { useEffect, useState } from "react";
import type{Todo} from '../types/todo' 
import TodoList from "@/components/TodoList";

function Home() {
  const[input,setInput]=useState('')
  const[todos,setTodos]=useState<Todo[]>([])
  const[editingTodoId,setEditingTodoId]=useState<string|null>(null)

    useEffect(()=>{
    const stored= localStorage.getItem('todos')
     if(stored) {
      const parsed:Todo[]=( JSON.parse(stored))
      setTodos(parsed)
     }
       
      
    },[])
    useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  const addTodo=()=>{
    if(!input.trim()) return;
    if(editingTodoId){
      setTodos((prev)=>prev.map((todo)=>
        todo.id===editingTodoId ?{...todo,text:input}:todo
      ))
      setEditingTodoId('');
      setInput('')
      return
    }
    const newTodo:Todo={
      id:Date.now().toString(),
      text:input,
    }
    setTodos((prev)=>[newTodo,...prev])
    setInput('')
    
  }
  const onDelete=(id:string)=>{
    setTodos(todos.filter((todo)=>todo.id!==id))
  }
  const onEdit=(todo:Todo)=>{
    setInput(todo.text)
    setEditingTodoId(todo.id)
  }
  return (
    <main className="min-h-screen flex items-center justify-center flex-col  text-white bg-linear-to-r from-violet-900 to-violet-500">
      <div className="w-full min-h-10  max-w-md bg-white text-black rounded-2xl shadow-xl p-6">
      <h1 className="text-3xl font-bold text-center mb-5">Todo App</h1>
    <div className="flex flex-col gap-2" >
      <input className="outline-none border-2 border-gray-700 p-2 rounded" type="text" value={input}
      onChange={(e)=>setInput(e.target.value)}
      />
      
      <button className="bg-blue-600 cursor-pointer text-white p-2 rounded hover:bg-red-500 transition-all" onClick={addTodo} >Add Todo</button>
     
      <TodoList 
      todos={todos}
      onDelete={onDelete}
      onEdit={onEdit}
      />
      </div>
       </div>
    </main>
  )
}

export default Home;
