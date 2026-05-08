import type {Todo} from '../types/todo'
interface TodoListProps{
    todos:Todo[],
    onDelete:(id:string)=>void
    onEdit:(todo:Todo)=>void
}

const TodoList = ({todos,onDelete,onEdit}:TodoListProps) => {
  return (
    <div>
      {todos.map((todo)=>{
        return <div className="flex justify-between mt-2"
         key={todo.id}> 
        <h2 className="bg-cyan-900 w-56 p-2 rounded-2xl text-white "> {todo.text}</h2>
         <button className="bg-amber-600 text-white cursor-pointer px-2 py-1 rounded-lg hover:bg-amber-500  active:bg-amber-300 transition-all" onClick={()=>onEdit(todo)}>Edit</button>
         <button className="bg-red-600 cursor-pointer px-2 py-1 rounded-lg hover:bg-red-500 active:bg-red-300 text-white transition-all" onClick={()=>onDelete(todo.id)}>Delete</button>
         </div>
      })}
    </div>
  )
}

export default TodoList
