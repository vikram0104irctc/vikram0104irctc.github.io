const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 90);
});

let menu = document.querySelector("#menu-icon");
let menulist = document.querySelector(".menulist");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  menulist.classList.toggle("open");
};
window.onscroll = () => {
  menu.classList.remove("bx-x");
  menulist.classList.remove("open");
};

var typed = new Typed(".input", {
  strings: ["Web Designer.", "Web Developer."],
  typeSpeed: 120,
  backSpeed: 70,
  loop: true,
});

function downloadFile(event) {
  event.preventDefault();
  const link = event.currentTarget;
  const url = link.href;
  window.open(url, "_blank");
  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.download = "VikramKumarChoudhary-FullStackWebDeveloper-Resume.pdf";
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxB4ZMwTDbV57T52YiM3pSw2-r4JwMCV6D0zygY8nyGQVj7vFWEDRIvnfrUY1seY1_c/exec";
let form = document.forms["google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) =>
      alert("Thanks for Contacting us..! I Will Contact You Soon...")
    )
    .catch((error) => console.error("Error!", error.message));
    form.reset()
});
