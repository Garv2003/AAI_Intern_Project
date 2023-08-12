let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});

const signupform = document.querySelector(".signup-form");
const name = document.querySelector(".name");
const user = document.querySelector("#email");
const password = document.querySelector("#spassword");
const confirmp = document.querySelector("#confirm-password");
const signdiv = document.querySelector(".signup-box");
signupform.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {
    name: name.value,
    email: user.value,
    password: password.value,
  };
  axios({
    method: "post",
    url: "http://localhost:4444/signup/",
    headers: {},
    data: {
      name: name.value,
      email: user.value,
      password: password.value,
    },
  }).then((res) => {
    console.log(res.data);
    var element = document.createElement("div");
    element.appendChild(
      document.createTextNode("Sign Up sucessfully")
    );
    document.querySelector("#message").appendChild(element);
  });
  name.value = "";
  user.value = "";
  password.value = "";
  confirmp.value = "";
});
