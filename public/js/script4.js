const btn = document.querySelector(".user");
const popup = document.querySelector(".container1");
const overlay = document.querySelector("#overlay");
const type = document.querySelector("#type");
btn.addEventListener("click", () => {
  if (popup.classList == "container1") {
    // if(type.innerText=="Capital expenditure"){
    //     popup.classList.add("open-container1");
    //     overlay.classList.remove("hidden");
    // }
    // else{
    //     popup.classList.add("open-container1");
    //     overlay.classList.remove("hidden");
    // }
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
});

const formin = document.querySelector("#formin");
const id = document.querySelector(".contractid");
const info1 = document.querySelector("#info1");
const info2 = document.querySelector("#info2");
const info3 = document.querySelector("#info3");
// const info4 = document.querySelector("#info4");
// const info5 = document.querySelector("#info5");
const info6 = document.querySelector("#info6");
const info7 = document.querySelector("#info7");

formin.addEventListener("submit", (e) => {
  e.preventDefault();
  axios({
    method: "post",
    url: "http://localhost:4444/addinventory",
    headers: { "Content-Type": "multipart/form-data" },
    data: {
      Contract_id: id.innerText,
      Invent_Serial_Number: info1.value,
      Invent_Type: info2.value,
      Invent_Model: info3.value,
      // Invent_StartDate: info4.value,
      // Invent_EndDate: info5.value,
      Invent_EndlifeDate: info6.value,
      myfile: info7.files[0],
    },
  })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});
