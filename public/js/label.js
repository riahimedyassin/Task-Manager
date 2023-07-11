import {LABEL_URL} from "./constants.js"
import { applyFilter,fetchData ,deleteTask} from "./index.js"



const appendLabel=(labels) => {
    const labelRender= document.querySelector(".labels")
    labelRender.innerHTML=""
    const removeFilter = document.createElement("div")
    removeFilter.innerHTML="No Filter";
    removeFilter.classList.add("label")
    removeFilter.classList.add("labelRed")
    removeFilter.addEventListener("click",() => {
        fetchData()
    })
    labelRender.appendChild(removeFilter)
    labels.forEach(label => {
        let labelHolder = document.createElement("div")
        labelHolder.classList.add('label')
        labelHolder.innerHTML=label.name;
        labelHolder.setAttribute("data-name",label.name)
        labelRender.appendChild(labelHolder)
        labelHolder.addEventListener("click",()=> {
            applyFilter(label.name)
        })
        labelHolder.addEventListener("dblclick",async ()=> {
            await deleteLabel(label.name)
            await deleteWithLabel(label.name)
            await fetchLabel()
            await fetchData()
        })

    })
}
const deleteWithLabel=async (label) => {
    const tasks = await fetchData()
    tasks.forEach(task => {
        if(task.label===label) {
            deleteTask(task._id)
        }
    })
}

const addLabel=(name) => {
    fetch(LABEL_URL,{
        method:"POST"
        ,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    })
    .then(()=> fetchLabel())
    .catch(err=> console.log(err))
}
const deleteLabel = (name) => {
    fetch(LABEL_URL,{
        method:"DELETE",
        headers:{ 
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({name})
    })
    .then(res=> console.log(res))
    .catch(err=> console.log(err))
}



const fetchLabel = async() => {
    try {
        const data = await fetch(LABEL_URL,{
            method:"GET"
        })
        const labels = await data.json()
        if(labels) {
            appendLabel(labels)
        }
    } catch (error) {
        console.log(error)
    }
} 

export {fetchLabel,addLabel,deleteLabel}