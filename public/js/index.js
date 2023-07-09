
import API_URL from "./constants.js"
const deleteTask = async (id) => {

    try {
        const data = await fetch(`${API_URL}/${id}`, {
            method:"DELETE"
        })
        const dataJSON=await data.json()
        console.log(dataJSON)
    } catch (error) {
        console.log(error)
    }
}


let alertField = document.querySelector("#alertField")
const appendData = (arr) => {
    let render = document.querySelector(".render")
    render.innerHTML=""
    arr.forEach(task => {
        let holder = document.createElement("div")
        holder.setAttribute("id",task._id)
        holder.classList.add("taskContainer");
        let title = document.createElement("h2")
        title.innerHTML=task.name
        task.done ? title.style.color="red" : title.style.color="green"
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
    })
}

//PREVENT THE DEFAULT BEHAVIOUR OF THE FORM SUBMETTING
document.formDom.addEventListener("submit",(e) => e.preventDefault())


const createTask=async () => {
    const input = document.querySelector("#name")
    const name = input.value
    
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
        body: JSON.stringify({name:name,done:false})
    })
    .then(res=>{
        input.value=""
        fetchData()
    })
    .catch(err=>console.log(err)) 

    
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
    } catch (error) {
        console.log(error)
    }
}

document.querySelector("#addTask").addEventListener("click",createTask)
window.onload=fetchData