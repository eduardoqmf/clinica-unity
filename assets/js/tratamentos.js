// Função para carregar tratamentos
async function carregarTratamentos() {
	try {
		const response = await fetch("assets/data/tratamentos.json");
		const tratamentos = await response.json();

		const wrapper = document.getElementById("tratamentos-wrapper");

		tratamentos.forEach((tratamento) => {
			const card = document.createElement("div");
			card.className = "tratamento-card";

			card.innerHTML = `
          <div class="tratamento-titulo">${tratamento.nome}</div>
          <div class="tratamento-conteudo">${tratamento.descricao}</div>
        `;

			// Evento para abrir/fechar o card
			card.addEventListener("click", function () {
				card.classList.toggle("open");
			});

			wrapper.appendChild(card);
		});
	} catch (error) {
		console.error("Erro ao carregar tratamentos:", error);
	}
}

// Chamar a função ao carregar a página
carregarTratamentos();
