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
						.map(
							([rede, url]) => `
              <a href="${url}" target="_blank">
                <img src="assets/img/${rede}.png" alt="${rede}" class="w-4 h-4" />
              </a>`
						)
						.join("")
				: "";

			const slide = document.createElement("div");
			slide.className =
				"swiper-slide flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-md";

			slide.innerHTML = `
          <img 
            src="${d.imagem}" 
            alt="${d.nome}" 
            class="w-40 h-40 object-cover rounded-full mb-4 cursor-pointer"
            data-nome="${d.nome}" 
            data-profissao="${d.profissao}" 
            data-cro="${d.cro}" 
            data-curriculo='${JSON.stringify(d.curriculo || [])}'
          />
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

		ativarModal(); // Ativar modal depois de carregar os dentistas
	} catch (error) {
		console.error("Erro ao carregar dentistas:", error);
	}
}

// Função para abrir o modal com informações do dentista
function ativarModal() {
	const modal = document.getElementById("modal-curriculo");
	const closeBtn = document.getElementById("modal-close");

	// Clicou na imagem
	document.querySelectorAll("#dentistas-wrapper img").forEach((img) => {
		img.addEventListener("click", (e) => {
			const nome = e.target.getAttribute("data-nome");
			const profissao = e.target.getAttribute("data-profissao");
			const cro = e.target.getAttribute("data-cro");
			const curriculo = JSON.parse(
				e.target.getAttribute("data-curriculo") || "[]"
			);

			document.getElementById("modal-nome").textContent = nome;
			document.getElementById("modal-profissao").textContent = profissao;
			document.getElementById("modal-cro").textContent = cro;

			const list = document.getElementById("modal-curriculo-list");
			list.innerHTML = "";
			curriculo.forEach((item) => {
				const li = document.createElement("li");
				li.textContent = item;
				list.appendChild(li);
			});

			modal.classList.add("active");
		});
	});

	// Clicou no botão X
	closeBtn.addEventListener("click", () => {
		modal.classList.remove("active");
	});

	// Clicou fora do conteúdo do modal
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			modal.classList.remove("active");
		}
	});
}

// Chamar a função para carregar dentistas
carregarDentistas();
