document.addEventListener("DOMContentLoaded", function () {
	// === Menu mobile ===
	const menuOpener = document.querySelector(".menuopener");
	const menuList = document.querySelector(".menu ul");

	if (menuOpener && menuList) {
		menuOpener.addEventListener("click", () => {
			menuList.classList.toggle("active");
		});
		// Fecha o menu ao clicar em um link (útil para mobile)
		document.querySelectorAll(".menu ul li a").forEach((link) => {
			link.addEventListener("click", () => {
				menuList.classList.remove("active");
			});
		});
	}

	// === Menu ativo ===
	const navLinks = document.querySelectorAll(".menu ul li a");

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			document
				.querySelector(".menu ul li.active")
				?.classList.remove("active");
			link.parentElement.classList.add("active");
		});
	});

	// === Scroll Spy ===
	const sections = document.querySelectorAll("section[id]");

	window.addEventListener("scroll", () => {
		let scrollY = window.scrollY;

		sections.forEach((section) => {
			const sectionTop = section.offsetTop - 120;
			const sectionHeight = section.offsetHeight;
			const sectionId = section.getAttribute("id");

			if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
				document
					.querySelector(".menu ul li.active")
					?.classList.remove("active");
				document
					.querySelector(`.menu ul li a[href="#${sectionId}"]`)
					?.parentElement.classList.add("active");
			}
		});
	});
});
