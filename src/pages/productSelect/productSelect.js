document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões e modais
    const btnProducts = document.querySelectorAll('.btnProduct');
    const modalInfos = document.querySelectorAll('.modalInfo');

    // Itera sobre todos os botões
    btnProducts.forEach((btnProduct, index) => {
        btnProduct.addEventListener('click', function() {
            // Seleciona o modal correspondente ao índice do botão clicado
            const modalInfo = modalInfos[index];
            
            // Alterna a visibilidade do modal
            modalInfo.style.display = modalInfo.style.display === 'none' || modalInfo.style.display === '' ? 'block' : 'none';
            
            // Alterna a classe de arredondamento das bordas
            btnProduct.classList.toggle('no-radius');
        });
    });
});