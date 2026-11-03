const container = document.querySelector(".container");
const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");
const themeToggleBtn = document.querySelector("#theme-toggle-btn");

let typingInterval;

const userData = {
message:""
};

// Set theme
const isLightTheme = localStorage.getItem("themeColor") === "light_mode";
document.body.classList.toggle("light-theme", isLightTheme);
themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode";

// Create message
const createMessageElement = (content,...classes)=>{

const div = document.createElement("div");

div.classList.add("message",...classes);

div.innerHTML = content;

return div;

};

// Scroll
const scrollToBottom = ()=>{
container.scrollTo({
top:container.scrollHeight,
behavior:"smooth"
});
};

// Typing animation
const typingEffect = (text,textElement,botMsgDiv)=>{

textElement.textContent="";

const words = text.split(" ");

let wordIndex = 0;

typingInterval = setInterval(()=>{

if(wordIndex < words.length){

textElement.textContent += (wordIndex===0?"":" ") + words[wordIndex++];

scrollToBottom();

}
else{

clearInterval(typingInterval);

botMsgDiv.classList.remove("loading");

document.body.classList.remove("bot-responding");

}

},40);

};

// RAG API response
const generateResponse = async(botMsgDiv)=>{

const textElement = botMsgDiv.querySelector(".message-text");

try{

const response = await fetch("http://127.0.0.1:5000/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
question:userData.message
})

});

const data = await response.json();

const responseText = data.answer;

typingEffect(responseText,textElement,botMsgDiv);

}catch(error){

textElement.textContent="Server error. Please try again.";

textElement.style.color="red";

botMsgDiv.classList.remove("loading");

document.body.classList.remove("bot-responding");

}

};

// Submit message
const handleFormSubmit = (e)=>{

e.preventDefault();

const userMessage = promptInput.value.trim();

if(!userMessage || document.body.classList.contains("bot-responding")) return;

userData.message = userMessage;

promptInput.value="";

document.body.classList.add("chats-active","bot-responding");

// User message

const userMsgHTML = `<p class="message-text"></p>`;

const userMsgDiv = createMessageElement(userMsgHTML,"user-message");

userMsgDiv.querySelector(".message-text").textContent = userData.message;

chatsContainer.appendChild(userMsgDiv);

scrollToBottom();

setTimeout(()=>{

// Bot message

const botMsgHTML = `
<img class="avatar" src="ai.png"/>
<p class="message-text">Searching documents...</p>
`;

const botMsgDiv = createMessageElement(botMsgHTML,"bot-message","loading");

chatsContainer.appendChild(botMsgDiv);

scrollToBottom();

generateResponse(botMsgDiv);

},600);

};

// Theme toggle
themeToggleBtn.addEventListener("click",()=>{

const isLightTheme = document.body.classList.toggle("light-theme");

localStorage.setItem("themeColor",isLightTheme?"light_mode":"dark_mode");

themeToggleBtn.textContent = isLightTheme ? "dark_mode":"light_mode";

});

// Delete chats
document.querySelector("#delete-chats-btn").addEventListener("click",()=>{

chatsContainer.innerHTML="";

document.body.classList.remove("chats-active","bot-responding");

});

// Suggestions
document.querySelectorAll(".suggestions-item").forEach((suggestion)=>{

suggestion.addEventListener("click",()=>{

promptInput.value = suggestion.querySelector(".text").textContent;

promptForm.dispatchEvent(new Event("submit"));

});

});

// Voice input
function startVoice(){

const recognition = new webkitSpeechRecognition();

recognition.lang="en-US";

recognition.onresult=function(event){

let text = event.results[0][0].transcript;

promptInput.value=text;

};

recognition.start();

}

// Submit
promptForm.addEventListener("submit",handleFormSubmit);