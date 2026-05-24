const ADMIN_PASSWORD = "zishan123"

let adminMode = false

/* ========================= */
/* CHALLENGES */
/* ========================= */

const challenges = [

{
title:"1. No Sugar For 30 Days",
desc:"I will not eat or drink anything that contains sugar no sugary drinks, no junk food, and nothing with added sugar.",
days:30
},

{
title:"2. Drink 3 Litres Water Daily",
desc:"I know most people think this is easy, but in reality, we often forget to stay hydrated. Many people walk around dehydrated without even realizing it, and it can affect energy, focus, mood, and overall health. To stay consistent, I’ll set 5 reminders on my phone to drink water 600ml each time",
days:30
},

{
title:"3. No Screens After 12",
desc:"No reels, no scrolling, no texting ( jokes on me there is no one to text ) no distractions after midnight.",
days:30
},

{
title:"4. Daily Prayer",
desc:"As an act of meditation and discipline, I’ll pray 5 times a day to God. Since I’m Muslim, I already have a powerful form of meditation in my daily life. This will help me improve my focus, calm my mind, and gain stronger control over my actions",
days:30
},

{
title:"5. The 3 Hour Disappear",
desc:"Once a week, I'll completely vanish for 3 hours. No phone. No wifi. No people. Go sit somewhere alone. Walk. Think. Exist without performing for anyone. Most people have never spent 3 hours truly alone. This is where I'll start to hear myself again.",
days:4,
weeks:true
},

{
title:"6. Wake Up Early",
desc:"I’m already an early riser, so this won’t be too difficult for me. But sometimes laziness takes over, so for the next 30 days, I’ll wake up one hour earlier than usual. Early mornings give you peace, clarity, and control over your day",
days:30
},

{
title:"7. Speak Less, Observe More",
desc:"For 30 days, I'll focus on listening more than speaking ( again it's not hard for me 😭). This will improves awareness, understanding, and decision-making.",
days:30
},

{
title:"8. Do One Hard Thing Daily",
desc:"Do one difficult task every single day. For me nothing is hard except studying.",
days:30
},

{
title:"9. No Complaining",
desc:"No excuses. No blaming. Only solutions.",
days:30
}

]

const container =
document.getElementById("challengeContainer")

/* ========================= */
/* LOAD WEBSITE */
/* ========================= */

function loadWebsite(){

container.innerHTML = ""

challenges.forEach((challenge,cIndex)=>{

const card =
document.createElement("div")

card.classList.add("challenge-card")

let boxes = ""

for(let i=1;i<=challenge.days;i++){

const key =
`challenge-${cIndex}-day-${i}`

const saved =
localStorage.getItem(key)

let className = ""
let text = challenge.weeks
? `Week ${i}`
: `Day ${i}`

if(saved === "completed"){

className = "completed"
text = "✔"

}

if(saved === "failed"){

className = "failed"
text = "✖"

}

boxes += `
<div
class="day-box ${className}"
data-key="${key}"
onclick="boxClick(this)"
>

${text}

</div>
`

}

card.innerHTML = `

<h2>${challenge.title}</h2>

<p>${challenge.desc}</p>

<div class="days-grid">

${boxes}

</div>

`

container.appendChild(card)

})

updateChart()

}


/* ========================= */
/* BOX CLICK */
/* ========================= */

function boxClick(el){

if(!adminMode) return

const key =
el.dataset.key

/* NORMAL -> COMPLETE */

if(
!el.classList.contains("completed")
&&
!el.classList.contains("failed")
){

el.classList.add("completed")

el.innerHTML = "✔"

localStorage.setItem(key,"completed")

}

/* COMPLETE -> FAILED */

else if(
el.classList.contains("completed")
){

el.classList.remove("completed")

el.classList.add("failed")

el.innerHTML = "✖"

localStorage.setItem(key,"failed")

}

/* FAILED -> RESET */

else{

el.classList.remove("failed")

localStorage.removeItem(key)

const split =
key.split("-")

const num = split[3]

if(el.dataset.key.includes("challenge-4")){

el.innerHTML = `Week ${num}`

}else{

el.innerHTML = `Day ${num}`

}

}

updateChart()

}

/* ========================= */
/* CHART */
/* ========================= */

const ctx =
document.getElementById("progressChart")

const progressChart =
new Chart(ctx,{

type:'line',

data:{

labels:[
'No Sugar',
'Water',
'No Screens',
'Prayer',
'Disappear',
'Wake Early',
'Observe',
'Hard Thing',
'No Complaining'
],

datasets:[{

label:'Discipline Progress',

data:[0,0,0,0,0,0,0,0,0],

borderColor:'#ffffff',

backgroundColor:'rgba(255,0,60,0.15)',

pointBackgroundColor:'#ff003c',

pointBorderColor:'#ffffff',

pointRadius:6,

pointHoverRadius:10,

fill:true,

tension:0.4,

borderWidth:4

}]
},

options:{

responsive:true,

maintainAspectRatio:false,
  
plugins:{

tooltip:{

backgroundColor:'#111',

titleColor:'#ff003c',

bodyColor:'white',

borderColor:'#ff003c',

borderWidth:1

},
  
legend:{

labels:{
color:'white'
}

}

},

scales:{

x:{
ticks:{
color:'white'
}
},

y:{
beginAtZero:true,

max:30,

ticks:{
color:'white'
}
}

}

}

})

/* ========================= */
/* UPDATE CHART */
/* ========================= */

function updateChart(){

const cards =
document.querySelectorAll(".challenge-card")

let values = []

cards.forEach(card=>{

const completed =
card.querySelectorAll(".completed").length

values.push(completed)

})

progressChart.data.datasets[0].data =
values

progressChart.update()

}

/* ========================= */
/* ADMIN BUTTON */
/* ========================= */

const adminBtn =
document.getElementById("adminBtn")

if(adminBtn){

adminBtn.addEventListener("click",()=>{

const pass =
prompt("Enter Admin Password")

if(pass === "zishan123"){

adminMode = true

alert("Admin Mode Enabled 🔥")

}else{

alert("Wrong Password")

}

})

}

loadWebsite()
