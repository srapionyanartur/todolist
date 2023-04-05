import React from 'react';
import './App.css';
import TodoList from './todolist';
import {TaskType} from './todolist';
import { useState } from 'react';
import { v1 } from 'uuid';

export type filterValuesType = "all" | "completed" | "active"

function App() {

let initTasks = [
  {id: v1(), title: "CSS", isDone: false },
  {id: v1(), title: "JS", isDone: false },
  {id: v1(), title: "React", isDone: false }
]

/*let task2: Array<TaskType> = [
  {id: 1, title: "The Godfather", isDone: true },
  {id: 2, title: "Pulp Fiction", isDone: true },
  {id: 3, title: " Interstellar", isDone: false }
]
*/

var [tasks,setTasks] = useState<Array<TaskType>> (initTasks)
var [filter, setFilter] = useState<filterValuesType>("all")

function removeTask(id: string) {
  var filteredTasks = tasks.filter(t => t.id !== id)
  setTasks(filteredTasks)
}

function addTask (title: string) {
  var newTask = {id: v1(), title, isDone: false} 
  var newTasks = [newTask,...tasks]
  setTasks(newTasks)
}

function changeStatus (taskId: string, isDone: boolean) {
  var task = tasks.find ( t => t.id === taskId )
  if (task) {
    task.isDone = isDone
  } 
  setTasks([...tasks]) 
}

function changeFilter (value: filterValuesType) {
  setFilter(value)
}

var taskForTodoList = tasks
if (filter === "completed") {
  taskForTodoList = tasks.filter(t => t.isDone === true)
}

if (filter === "active") {
  taskForTodoList = tasks.filter(t => t.isDone === false)

}

  return (
    <div className="App">
      <TodoList title = "What to learn" 
                tasks = {taskForTodoList}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
                addTask = {addTask}
                changeTaskStatus = {changeStatus}
                filter = {filter} />
                 
   
    </div>
  );
}


export default App;
