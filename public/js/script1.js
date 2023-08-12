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
const overlay = document.querySelector("#overlay");
btn.addEventListener("click", () => {
  if (popup.classList == "container1") {
    popup.classList.add("open-container1");
    overlay.classList.remove("hidden");
  } else {
    popup.classList.remove("open-container1");
    overlay.classList.add("hidden");
  }
});
overlay.addEventListener("click", () => {
  if (popup.classList == "container1 open-container1") {
    overlay.classList.add("hidden");
    popup.classList.remove("open-container1");
  }
  if (popupmenu.classList == "popupmenu open-popupmenu") {
    overlay.classList.add("hidden");
    popupmenu.classList.remove("open-popupmenu");
  }
});

const popupinfo = document.querySelectorAll("#popupbutton");
const popupmenu = document.querySelector(".popupmenu");

popupinfo.forEach(function (button) {
  button.addEventListener("click", () => {
    var row = event.target.closest("tr"); // Find the parent row
    var rowDataCells = row.querySelectorAll("td"); // Get data cells excluding the last one
    console.log(rowDataCells[0].innerText);
    axios({
      method: "post",
      url: "http://localhost:4444/getdetails/",
      headers: {},
      data: {
        id: rowDataCells[0].innerText,
      },
    }).then((res) => {
      popupmenu.innerHTML = `<div>
        <div>Contract_EndData:${res.data.Contract_EndData}</div>
        <div>Contract_StartDate${res.data.Contract_StartDate}</div>
        <div>Contract_ID:${res.data.Contract_ID}</div>
        <div>Billing_Cycle${res.data.Billing_Cycle}</div>
        <div>${res.data.Contract_Name}</div>
        <div>${res.data.Contract_Type}</div>
        <div>${res.data.Contract_Price}</div>
        <div>${res.data.Contract_Status}</div>
        <div>${res.data.Modified_Date}</div>
        <div>${res.data._id}</div>
        </div>`
    });
    popupmenu.classList.add("open-popupmenu");
    overlay.classList.remove("hidden");
  });
});
