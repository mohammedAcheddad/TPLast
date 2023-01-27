const alo = document.getElementById("RR");
const url = "http://localhost:3000"
export const addMemo = (content,response) => {
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
            parse(dataQ,alo)
        })

        }
        else{
            alert("")
        }
    })
    .catch(err=>console.log(err));
}

function parse(item,body){
    console.log(item)
    let questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    if (item.response === "true") {
        questionDiv.classList.add("true");
    } else {
        questionDiv.classList.add("false");
    }
    let idSpan = document.createElement("span");
    idSpan.classList.add("idQuestion");
    idSpan.innerHTML = item.id;
    questionDiv.appendChild(idSpan);
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    contentDiv.innerHTML = item.content;
    questionDiv.appendChild(contentDiv);
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "delete";
    questionDiv.appendChild(deleteButton);
    let switchButton = document.createElement("button");
    switchButton.classList.add("switch");
    switchButton.innerHTML = "switch";
    questionDiv.appendChild(switchButton);
    body.appendChild(questionDiv);


}