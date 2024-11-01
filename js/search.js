//PESQUISA DE SERVICOS
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.pesquisa input');
    const cards = document.querySelectorAll('.cards .card');

    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();

        cards.forEach(card => {
            // PEGA O TEXTO DO TITULO E DESCRIÇAO DO SERVIÇO
            const title = card.querySelector('h3').textContent.toLowerCase();
            const service = card.querySelector('h5').textContent.toLowerCase();

            //DEFINE PALVRAS-CHAVE PARA CADA CARD
            const keywords = card.getAttribute('data-keywords') || '';

            //VERIFICA SE O TERMO DE BUSCA ESTÁ PRESENTE EM QUALQUER UM DOS CAMPOS
            const isVisible =
                title.includes(searchTerm) ||
                service.includes(searchTerm) ||
                keywords.toLowerCase().includes(searchTerm);

            // MOSTRA OU OCULTA O CARD DE ACORDO COM A PESQUISA
            card.style.display = isVisible ? 'block' : 'none';
        });
    });
});