import API_URL from "./constants.js"

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
        holder.appendChild(title);
        let iconContainer = document.createElement("div")
        let deleteImg= document.createElement("img")
        deleteImg.src="./src/delete.png"
        deleteImg.classList.add("icon")
        iconContainer.appendChild(deleteImg)
        let editImg=document.createElement("img")
        editImg.src="./src/edit.png"
        editImg.classList.add("icon")
        iconContainer.appendChild(editImg)
        holder.appendChild(iconContainer);
        render.appendChild(holder)
    })
}

//PREVENT THE DEFAULT BEHAVIOUR OF THE FORM SUBMETTING
document.formDom.addEventListener("submit",(e) => e.preventDefault())


const createTask=async () => {
    const name = document.querySelector("#name").value
    if(!name){
        alertField.innerHTML="Please enter a valid name"
        setTimeout(() => alertField.innerHTML="",3000)
        return
    }
    axios.post(API_URL,{name:name,done:false})
    .then(res=>console.log(res))
    .catch(err=>console.log(err)) 
    
    fetchData()
    
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