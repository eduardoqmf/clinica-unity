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
		const response = await fetch("assets/data/dentistas.json");
		const dentistas = await response.json();

		const wrapper = document.getElementById("dentistas-wrapper");

		dentistas.forEach((d) => {
			const socialIcons = d.redes
				? Object.entries(d.redes)
						.map(
							([rede, url]) => `
              <a href="${url}" target="_blank">
                <img src="assets/img/icones/${rede}.png" alt="${rede}" class="w-4 h-4" />
              </a>`
						)
						.join("")
				: "";

			const slide = document.createElement("div");
			slide.className = "swiper-slide";

			slide.innerHTML = `
				  <div class="card-dentista">
					<img 
					  src="${d.imagem}" 
					  alt="${d.nome}" 
					  class="img-dentista"
					  data-nome="${d.nome}" 
					  data-profissao="${d.profissao}" 
					  data-cro="${d.cro}" 
					  data-curriculo='${JSON.stringify(d.curriculo || [])}'
					/>
					<h3 class="nome-dentista">${d.nome}</h3>
					<p class="profissao-dentista">${d.profissao}</p>
					<p class="cro-dentista">${d.cro}</p>
					${
						d.redes && Object.keys(d.redes).length > 0
							? `
					  <div class="redes-dentista">
						${Object.entries(d.redes)
							.map(
								([rede, url]) => `
							<a href="${url}" target="_blank" class="icone-rede">
							  <img src="assets/img/icones/${rede}.png" alt="${rede}" />
							</a>
						  `
							)
							.join("")}
					  </div>`
							: ""
					}
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
	document.querySelectorAll(".img-dentista").forEach((img) => {
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

// TODO: verificar se tem como colocar os dentistas igual ao icone, para não ter que mudar varias vezes o caminho se precisar
