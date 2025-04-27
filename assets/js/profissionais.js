// Inicializar o Swiper
const swiper = new Swiper(".profissionais-swiper", {
	slidesPerView: 1,
	spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		640: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
	},
});

// Função para carregar dentistas
async function carregarDentistas() {
	try {
		const response = await fetch("assets/json/dentistas.json");
		const dentistas = await response.json();

		const wrapper = document.getElementById("dentistas-wrapper");

		dentistas.forEach((d) => {
			const socialIcons = d.redes
				? Object.entries(d.redes)
						.map(([rede, url]) => {
							return `<a href="${url}" target="_blank">
                      <img src="assets/img/${rede}.png" alt="${rede}" class="w-4 h-4" />
                  </a>`;
						})
						.join("")
				: "";

			const slide = document.createElement("div");
			slide.className =
				"swiper-slide flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-md";
			slide.innerHTML = `
                <img src="${d.imagem}" alt="${d.nome}" class="w-40 h-40 object-cover rounded-full mb-4"/>
                <h3 class="text-xl font-semibold text-[#0079c7]">${d.nome}</h3>
                <p class="text-gray-700 text-sm mt-2">${d.profissao}</p>
                <p class="text-gray-500 text-xs mt-1">${d.cro}</p>
                <div class="section-team--social">
                    ${socialIcons}
                </div>
            `;
			wrapper.appendChild(slide);
		});

		swiper.update(); // Atualiza o Swiper depois de adicionar slides
	} catch (error) {
		console.error("Erro ao carregar dentistas:", error);
	}
}

// Chamar a função
carregarDentistas();
