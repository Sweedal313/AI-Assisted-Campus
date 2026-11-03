const body = document.querySelector("body"),
modeToggle = body.querySelector(".mode-toggle"),
sidebar = body.querySelector("nav"),
sidebarToggle = body.querySelector(".sidebar-toggle");

// DARK MODE
let getMode = localStorage.getItem("mode");

if(getMode && getMode === "dark"){
body.classList.toggle("dark");
}

modeToggle.addEventListener("click", () =>{
body.classList.toggle("dark");

if(body.classList.contains("dark")){
localStorage.setItem("mode","dark");
}else{
localStorage.setItem("mode","light");
}
});

// SIDEBAR
sidebarToggle.addEventListener("click", () =>{
sidebar.classList.toggle("close");
});


// PAGE SWITCHING

const dashboardSection = document.getElementById("dashboardSection")
const uploadSection = document.getElementById("uploadSection")
const deleteSection = document.getElementById("deleteSection")

document.getElementById("dashboardBtn").onclick = () =>{
dashboardSection.style.display="block"
uploadSection.style.display="none"
deleteSection.style.display="none"
}

document.getElementById("uploadBtn").onclick = () =>{
dashboardSection.style.display="none"
uploadSection.style.display="block"
deleteSection.style.display="none"
}

document.getElementById("deleteBtn").onclick = () =>{
dashboardSection.style.display="none"
uploadSection.style.display="none"
deleteSection.style.display="block"

loadFiles()
}



// UPLOAD FILES

async function uploadFiles(){

const files = document.getElementById("fileInput").files

if(files.length === 0){
alert("Please select files")
return
}

const formData = new FormData()

for(let file of files){
formData.append("files", file)
}

const res = await fetch("http://127.0.0.1:5000/upload",{
method:"POST",
body:formData
})

const data = await res.json()

document.getElementById("uploadStatus").innerText = data.message

loadFiles()
}



// LOAD FILE LIST

async function loadFiles(){

const res = await fetch("http://127.0.0.1:5000/files")

const files = await res.json()

const table = document.getElementById("fileList")

table.innerHTML=""

files.forEach(file =>{

let row = document.createElement("tr")

row.innerHTML = `
<td>${file.name}</td>
<td>${file.size} KB</td>
<td>${file.date}</td>
<td>
<button onclick="deleteFile('${file.name}')">Delete</button>
</td>
`

table.appendChild(row)

})

}

// DELETE FILE

async function deleteFile(name){

await fetch(`http://127.0.0.1:5000/delete/${name}`,{
method:"DELETE"
})

loadFiles()

}


function searchFiles(){

const input = document.getElementById("searchInput").value.toLowerCase()

const list = document.getElementById("fileList")

const files = list.getElementsByTagName("li")

for(let i=0;i<files.length;i++){

let text = files[i].textContent.toLowerCase()

if(text.includes(input)){
files[i].style.display = ""
}else{
files[i].style.display = "none"
}

}

}


function searchFiles(){

let input = document.getElementById("searchInput").value.toLowerCase()

let rows = document.querySelectorAll("#fileTable tbody tr")

rows.forEach(row =>{

let text = row.innerText.toLowerCase()

if(text.includes(input)){
row.style.display=""
}else{
row.style.display="none"
}

})

}