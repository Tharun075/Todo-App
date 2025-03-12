import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from "../Redux/actions"
import '../Styles/todoStyle.css'

export const TodoList=()=>{
    const [input,setInput] = useState('')
    const todos = useSelector((state)=>state.todos)
    const dispatch = useDispatch()

    function handleAdd(){
        if(input.trim()){
            dispatch(ADD_TODO(input))
            setInput('')
        }
    }

    function handleDelete(id){
        dispatch(DELETE_TODO(id))
    }
    function handleToggle(id){
        dispatch(TOGGLE_TODO(id))
    }


    return(
        <>  
            <h1>Todo App</h1>
            <div className="input-container">
                <input
                type="text"
                placeholder="Enter todo"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            <div className="todos-container">
                <h2>Todos</h2>
                <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item" onClick={() => handleToggle(todo.id)}>
                    <span className="todo-description">
                        Description: {todo.text}
                        <div className="todo-status">
                        Status: {todo.completed ? "Completed" : "Pending"}
                    </div>
                    </span>
                    <button
                        className="delete-button"
                        onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering handleToggle on click
                        handleDelete(todo.id);
                        }}
                    >
                        Delete
                    </button>
                    
                    </li>
                ))}
                </ul>
            </div>
            

        </>
    )
}