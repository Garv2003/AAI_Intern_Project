const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

//show slider
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

//close slider
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

//change theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});
const totalcontract = document.querySelector(".totalcontract");
const revenue = document.querySelector("#revenue");
const capital = document.querySelector("#captial1");
const button1 = document.querySelector("#total");
button1.addEventListener("click", () => {
  if (totalcontract.classList != "hidden") {
    totalcontract.classList.remove("hidden");
  }
  revenue.classList.add("hidden");
  capital1.classList.add("hidden");
});

const button2 = document.querySelector("#revenueBox");
button2.addEventListener("click", () => {
  if (revenue.classList == "hidden") {
    revenue.classList.remove("hidden");
  }
  totalcontract.classList.add("hidden");
  capital1.classList.add("hidden");
});

const button3 = document.querySelector(".capital");
button3.addEventListener("click", () => {
  totalcontract.classList.add("hidden");
  capital1.classList.remove("hidden");
  revenue.classList.add("hidden");
});

const btn = document.querySelector(".user");
const popup = document.querySelector(".container1");
const overlay=document.querySelector('#overlay');
btn.addEventListener("click", () => {
  if (popup.classList == "container1 hidden") {
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden")

  } else {
    popup.classList.add("hidden");
    overlay.classList.add("hidden")
  }
});


overlay.addEventListener("click",()=>{
  if(popup.classList=="container1"){
    overlay.classList.add("hidden");
    popup.classList.add("hidden");
  }
})
