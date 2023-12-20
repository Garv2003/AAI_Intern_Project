const totalcontract = document.querySelector(".totalcontract");
const revenue = document.querySelector("#revenue");
const capital = document.querySelector("#captial1");
const button1 = document.querySelector("#total");

button1.addEventListener("click", () => {
  if (totalcontract.className === "totalcontract hidden") {
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
const info1 = document.querySelector(".info1");
const info2 = document.querySelector(".info2");
const info3 = document.querySelector(".info3");
const info4 = document.querySelector(".info4");
const info5 = document.querySelector(".info5");
const info6 = document.querySelector(".info6");
const info7 = document.querySelector(".info7");
const info8 = document.querySelector(".info8");
const info9 = document.querySelector(".info9");
const info10 = document.querySelector(".info10");
const info11 = document.querySelector(".info11");
const contid = document.querySelector(".contid");

let contractid;
var row;
popupinfo.forEach(function (button) {
  button.addEventListener("click", (event) => {
    row = event.target.closest("tr");
    var rowDataCells = row.querySelectorAll("td");
    axios({
      method: "post",
      url: "http://localhost:4444/getdetails/",
      headers: {},
      data: {
        id: rowDataCells[0].innerText,
      },
    }).then((res) => {
      contractid = res.data._id;
      info1.innerText = res.data.Contract_ID;
      info2.innerText = res.data.Contract_Name;
      info3.innerText = res.data.Contract_Status;
      info4.innerText = res.data.Contract_Type;
      info5.innerText = res.data.Contract_StartDate;
      info6.innerText = res.data.Contract_EndData;
      info7.innerText = res.data.Description;
      info8.innerText = res.data.Contract_Price;
      info9.innerText = res.data.Billing_Cycle;
      info10.innerText = res.data.LastInvoice_Date;
      info11.href = `http://localhost:4444/${res.data.file}`;
      // contid.href=`http://localhost:4444/delcontract/${res.data._id}`
    });
    popupmenu.classList.add("open-popupmenu");
    overlay.classList.remove("hidden");
  });
});

const deletebtn = document.querySelector(".deletebtn");
const updatebtn = document.querySelector(".updatebtn");

deletebtn.addEventListener("click", () => {
  row.remove();
  popupmenu.classList.remove("open-popupmenu");
  popupmenu.classList.add("hidden");
  overlay.classList.add("hidden");
  axios
    .delete(`http://localhost:4444/delcontract/${contractid}`)
});

const title=document.querySelector(".title");

updatebtn.addEventListener("click", () => {
  console.log(contractid,info1,info2);
});
