const title = document.querySelector("#title")
const checkDone = document.querySelector("#checkDone")
const params = window.location.search
const TaskID = new URLSearchParams(params).get('id')
const editButton = document.querySelector(".edit")
const alertField = document.querySelector(".alertField")
const labelRender = document.querySelector(".labelRender")

import {API_URL} from "./constants.js"


const emitMessage= (message) => {
    alertField.innerHTML=message
    setTimeout(()=> alertField.innerHTML="",3000)
}

const renderTask = (task) => {
    const {name,done,label} = task;
    title.value=name;
    checkDone.checked=done
    labelRender.insertAdjacentHTML("afterbegin","<h4>Label : </h4>")
    const labelHolder = document.createElement("div")
    labelHolder.classList.add("label")
    labelHolder.innerHTML=label
    labelRender.appendChild(labelHolder);
}



const fetchTask=async (id) => {
    try {
        const data = await fetch(`${API_URL}/${id}`, {
            method: 'GET'
        })
        if(data.status===200) {
            const task = await data.json()
            renderTask(task)
        }
        else {
            alert("Error fetching the tasks.")
            location.href="/"
        }     
    }
    catch(err) {
        console.log(err)
    }
}
const patchTask =async  (id) => {
    fetch(`${API_URL}/${id}`, {
        method:"PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            name : title.value ,
            done : checkDone.checked 
        })
    })
    .then(res=> {
        if(res.status===201) {
            emitMessage("Changes Saved !")
        }
        else if (res.status===200) {
            emitMessage("No Changes")
        }
        else {
            emitMessage("ERROR SAVING !")
        }
    })
    .catch(err => console.log(err))

}




window.onload=await fetchTask(TaskID)
editButton.addEventListener("click",async () => {
    await patchTask(TaskID)
})