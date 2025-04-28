const menuOpener = document.querySelector(".menuopener");
const menuList = document.querySelector(".menu nav ul");

menuOpener.addEventListener("click", () => {
	menuList.classList.toggle("active");
});
