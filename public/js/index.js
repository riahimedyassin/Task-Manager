
import {API_URL,LABEL_URL} from "./constants.js"
import { addLabel, fetchLabel } from "./label.js"
const labelRender= document.querySelector(".labels")
const deleteTask = async (id) => {

    try {
        const data = await fetch(`${API_URL}/${id}`, {
            method:"DELETE"
        })
        console.log("Deleted Successfully")
    } catch (error) {
        console.log(error)
    }
}


let alertField = document.querySelector("#alertField")
const appendData = (arr) => {
    let render = document.querySelector(".render")
    render.innerHTML=""
    if(arr.length!==0) {arr.reverse().forEach(task => {
        let holder = document.createElement("div")
        holder.setAttribute("id",task._id)
        holder.classList.add("taskContainer");
        let title = document.createElement("h2")
        title.innerHTML=task.name
        task.done ? holder.classList.add("done") : holder.classList.remove("done")
        holder.appendChild(title);
        let iconContainer = document.createElement("div")
        let deleteImg= document.createElement("img")
        deleteImg.src="./src/delete.png"
        deleteImg.classList.add("icon")
        deleteImg.addEventListener("click",() => {
            deleteTask(task._id);
            fetchData()
        })
        iconContainer.appendChild(deleteImg)
        let editImg=document.createElement("img")
        editImg.src="./src/edit.png"
        editImg.classList.add("icon")
        editImg.addEventListener("click",()=> {
            window.location.href=`/task.html?id=${task._id}`
        })
        iconContainer.appendChild(editImg)
        holder.appendChild(iconContainer);
        render.appendChild(holder)
    })}
    else {
        render.innerHTML="No Available Tasks"
    }
}

//PREVENT THE DEFAULT BEHAVIOUR OF THE FORM SUBMETTING
document.formDom.addEventListener("submit",(e) => e.preventDefault())


const createTask=async () => {
    const input = document.querySelector("#name")
    const name = input.value
    const label = document.querySelector("#label").value
    if(!name){
        alertField.innerHTML="Please enter a valid Task"
        setTimeout(() => alertField.innerHTML="",3000)
        return
    }
    if(name.length>20) {
        alertField.innerHTML="Task length shouldn't exceed 20 Caracters"
        setTimeout(() => alertField.innerHTML="",3000)
        return;
    }
    fetch(API_URL, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:name,done:false,label})
    })
    .then(()=>{
        input.value=""
        fetchData()
    })
    .catch(err=>console.log(err)) 
    if(label) {
        addLabel(label)
    }

    
}

const fetchData= async () => {
    try {
        const data = await fetch(API_URL, {
            method:"GET",
            headers:{ 
                "Content-Type":"application/json"
            }
        })
        const dataJSON=await data.json()
        appendData(dataJSON)
        return dataJSON
    } catch (error) {
        console.log(error)
        return null
    }
}
const applyFilter=async (label) => {
    let render = document.querySelector(".render")
    const data = await fetchData()
    const filtred = data.filter(el => el.label===label)
    filtred.length ===0 ? render.innerHTML="No Elements With Such a Label" : appendData(filtred)
}





document.querySelector("#addTask").addEventListener("click",createTask)
window.onload=async () => {
    try {
        fetchData()
        fetchLabel()
    }
    catch(err) {
        console.log(err)
    }
}

export {applyFilter,fetchData,deleteTask}
