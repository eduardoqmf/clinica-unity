async function carregarGaleria() {
	try {
		const response = await fetch("assets/data/galeria.json");
		const fotos = await response.json();

		const galeriaWrapper = document.getElementById("galeria-wrapper");

		fotos.forEach((foto) => {
			const link = document.createElement("a");
			link.href = foto.imagem;
			link.setAttribute("data-fslightbox", "galeria");
			link.innerHTML = `
                <img src="${foto.imagem}" alt="${foto.descricao}" class="rounded-lg shadow-md hover:opacity-80 transition" />
            `;

			galeriaWrapper.appendChild(link);
		});

		// NOVO: Atualiza o Fslightbox
		refreshFsLightbox();
	} catch (error) {
		console.error("Erro ao carregar galeria:", error);
	}
}

carregarGaleria();
