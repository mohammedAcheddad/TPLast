const alo = document.getElementById("RR");
const url = "http://localhost:30000"
export const addMemo = (content,response,i) => {
    const dataToSend = {content,response}
    fetch(url+"/Questions",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.ok)
        {   
        res.json().then(data=>{
            const {dataQ} = data;
            parse(dataQ,alo,i)
        })

        }
        else{
            alert("")
        }
    })
    .catch(err=>console.log(err));
}
export const deleteMemo = (id) => {
    fetch(url+"/Questions/"+id,{
        method:"DELETE"
    }).then(res=>{
        if(res.ok)
        {
            document.getElementById(id).remove();
        }
        else
            alert("error")
    })
    .catch(err=>{
        alert("erreur")
        console.log(err)
    })
}
export const switchDiv = (id,response) => {

    fetch(url+"/Questions/"+id,{
        method:"PUT",
        body:JSON.stringify(response)
    }).then(res=>{
        if(res.ok)
        {
            let a = document.getElementById(id);
            if(response==="true"){
                
                a.classList.remove("false")
                a.classList.add("true")
            }
            else{
                
                a.classList.remove("true")
                a.classList.add("false")
            } 
        }
        else
            alert("error")
    })
    .catch(err=>{
        alert("erreur")
        console.log(err)
    })
}


function parse(item,body,i){
    console.log(item)
    let questionDiv = document.createElement("div");
    questionDiv.id = item._id
    questionDiv.classList.add("question");
    if (item.response === "true") {
        questionDiv.classList.add("true");
    } else {
        questionDiv.classList.add("false");
    }
    let idSpan = document.createElement("span");
    idSpan.classList.add("idQuestion");
    idSpan.innerHTML = i;
    questionDiv.appendChild(idSpan);
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    contentDiv.innerHTML = item.content;
    questionDiv.appendChild(contentDiv);
    let deleteButton = document.createElement("button");
    deleteButton.addEventListener('click', ()=>{
        deleteMemo(questionDiv.id)
    })
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "delete";
    questionDiv.appendChild(deleteButton);
    let switchButton = document.createElement("button");
    switchButton.addEventListener('click', ()=>{
        if (item.response === "true") {
            switchDiv(questionDiv.id,"false")
        } else {
            switchDiv(questionDiv.id,"true")
        }
    })
    switchButton.classList.add("switch");
    switchButton.innerHTML = "switch";
    questionDiv.appendChild(switchButton);
    body.appendChild(questionDiv);
}
