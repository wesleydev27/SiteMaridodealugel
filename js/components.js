document.addEventListener('DOMContentLoaded', function () {
    // Determina se estamos na página inicial ou em uma subpágina
    const isSubPage = window.location.pathname.includes('/pages/');
    const basePath = isSubPage ? '../' : './';

    // Carregar o Header
    fetch(`${basePath}components/header.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            // Ajusta os links do header baseado na localização atual
            adjustHeaderLinks();
            // Inicializar menu mobile após carregar o header
            initializeMobileMenu();
        })
        .catch(error => console.error('Erro ao carregar o header:', error));

    // Carregar o Footer
    fetch(`${basePath}components/footer.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o footer:', error));
});

// Ajusta os links do header baseado na localização atual
function adjustHeaderLinks() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const isSubPage = window.location.pathname.includes('/pages/');

    // Ajusta o link do logo
    const logoLink = nav.querySelector('.logo a');
    if (logoLink) {
        logoLink.href = isSubPage ? '../index.html' : './index.html';

        // Ajusta o caminho da imagem do logo
        const logoImg = logoLink.querySelector('img');
        if (logoImg) {
            logoImg.src = isSubPage ? '../img/Logo/logo2.png' : './img/Logo/logo2.png';
        }
    }

    // Ajusta os links do menu
    const menuLinks = nav.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('pages/')) {
            // Se estamos em uma subpágina, remove 'pages/' do início
            link.href = isSubPage ? href.replace('pages/', '') : href;
        } else if (href.startsWith('#')) {
            // Para links de âncora, adiciona o caminho correto para index se estivermos em uma subpágina
            link.href = isSubPage ? '../index.html' + href : href;
        }
    });
}

// Inicialização do menu mobile
function initializeMobileMenu() {
    const menuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');

    if (menuMobile && menu) {
        menuMobile.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}
