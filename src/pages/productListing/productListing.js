

let estadoInicial = true; // Variável para rastrear o estado inicial

document.getElementById("btnPedido").addEventListener("click", () => {
    if (estadoInicial) {
        esconderItensSemQuantidade();
        esconderProductGroups();
    } else {
        mostrarTudo();
    }
    estadoInicial = !estadoInicial; // Alterna o estado para o próximo clique
});

function mostrarTudo() {
    // Exibe todas as <ul> com a classe "productGroup"
    document.querySelectorAll('ul.productGroup').forEach(group => {
        group.style.display = 'block'; // Ou 'flex', dependendo do seu layout
    });

    // Mantém todas as <ul> com a classe "productItem" ocultas
    document.querySelectorAll('ul.productItem').forEach(productItem => {
        productItem.style.display = 'none'; // Mantém escondido

        // Exibe todos os <li> dentro da <ul class="productItem">
        productItem.querySelectorAll('li').forEach(item => {
            item.style.display = 'block'; // Ou 'flex', dependendo do seu layout
        });
    });
}

function esconderProductGroups() {
    // Seleciona todas as tags <ul> que possuem a classe "productGroup"
    document.querySelectorAll('ul.productGroup').forEach((group, index) => {
        // Seleciona a <ul class="productItem"> correspondente
        const productItem = document.querySelectorAll('ul.productItem')[index];
        
        if (productItem) {
            // Verifica se há algum <li> dentro da <ul class="productItem"> que tenha quantidade preenchida
            const hasQuantity = Array.from(productItem.querySelectorAll('li')).some(item => {
                const quantidadeInput = item.querySelector('#inputQnt input');
                return quantidadeInput && quantidadeInput.value.trim() !== '' && quantidadeInput.value !== '0';
            });

            // Se não houver quantidade preenchida, oculta a <ul class="productGroup">
            if (!hasQuantity) {
                group.style.display = 'none';
                productItem.style.display = 'none'; // Opcional: também oculta a <ul class="productItem">
            }
        } else {
            // Se não encontrar a <ul class="productItem"> correspondente, oculta a <ul class="productGroup">
            group.style.display = 'none';
        }
    });
}

function esconderItensSemQuantidade() {
    // Seleciona todas as tags <ul> que possuem a classe "productItem"
    document.querySelectorAll('ul.productItem').forEach(productItem => {
        // Itera sobre cada <li> dentro da <ul class="productItem">
        productItem.querySelectorAll('li').forEach(item => {
            // Seleciona o input de quantidade dentro de cada <li>
            const quantidadeInput = item.querySelector('#inputQnt input');

            // Verifica se o valor é 0, vazio ou nulo
            if (!quantidadeInput || quantidadeInput.value.trim() === '' || quantidadeInput.value === '0') {
                item.style.display = 'none'; // Oculta o <li> se a quantidade for 0 ou nula
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os botões e modais
    const btnProducts = document.querySelectorAll('.btnProduct');
    const modalInfos = document.querySelectorAll('.modalInfo');

    if (btnProducts.length === 0 || modalInfos.length === 0) {
        console.warn('Nenhum botão ou modal encontrado.');
    } else {
        // Itera sobre todos os botões
        btnProducts.forEach((btnProduct, index) => {
            if (modalInfos[index]) {
                btnProduct.addEventListener('click', function () {
                    const modalInfo = modalInfos[index];

                    // Alterna a visibilidade do modal
                    modalInfo.style.display = modalInfo.style.display === 'none' || modalInfo.style.display === '' ? 'block' : 'none';

                    // Alterna a classe de arredondamento das bordas
                    btnProduct.classList.toggle('no-radius');
                });
            } else {
                console.warn(`Modal não encontrado para o índice ${index}`);
            }
        });
    }

    adicionarEventListeners(); // Adiciona os event listeners para cálculos
});


// Você também pode adicionar um evento para detectar quando o estado muda
document.getElementById('togglePag').addEventListener('change', function () {
    calcularLucro();
    calcularLucroGeral();
});

// Você também pode adicionar um evento para detectar quando o estado muda
document.getElementById('toggleFrete').addEventListener('change', function () {
    calcularLucro();
    calcularLucroGeral();
});

// Função para calcular o valor total com base na quantidade e no preço proposto
function calcularValorTotal(produtoId) {
    const quantidade = document.getElementById(`Q${produtoId}`).value;
    const precoProposto = document.getElementById(`P${produtoId}`).value;
    const valorTotal = (quantidade * precoProposto).toFixed(2); // Calcula o valor total

    document.getElementById(`T${produtoId}`).innerText = `R$ ${valorTotal}`; // Atualiza o valor total no DOM

    calcularMarkup(produtoId); // Chama o cálculo do markup após atualizar o valor total
    calcularLucroGeral(); // Chama o cálculo do lucro geral após atualizar o valor total
}

// Função para calcular o lucro específico de cada produto
function calcularLucro() {
    let mkpGlobal2 = parseFloat(document.getElementById('MKPGLOBAL2').value) || 0;
    const toggleElementP = document.getElementById('togglePag');
    const toggleElementF = document.getElementById('toggleFrete');

    // Verificar se o toggle está ligado ou desligado
    if (toggleElementP.checked) {
        mkpGlobal2 = mkpGlobal2 - 3
    }
    if (toggleElementF.checked) {
        mkpGlobal2 = mkpGlobal2 - 6
    }
    console.log(mkpGlobal2);

    // Itera apenas sobre produtos específicos
    document.querySelectorAll('.productItem li').forEach(li => {
        const unitCodeElement = li.querySelector('.unitCode h2');
        if (unitCodeElement) {
            const produtoId = unitCodeElement.id;
            const markup = parseFloat(document.getElementById(`M${produtoId}`).innerText) || 0;
            const vlTabelaElement = document.getElementById(`B${produtoId}`);
            const precoProposto = document.getElementById(`P${produtoId}`).value;
            const quantidade = document.getElementById(`Q${produtoId}`).value;

            let mkpBonificacao = parseFloat(document.getElementById('MKPBONIFICACAO').value) || 0;
            let mkpContrato = parseFloat(document.getElementById('MKPCONTRATO').value) || 0;
            let lucro = ((markup - mkpGlobal2) / 100) * 100;
            lucro = lucro - mkpBonificacao - mkpContrato;

            const lucroElement = li.querySelector('.profitPercentage h2');
            const statusColor = li.querySelector('.statusColor');
            let vlTabela = 0;

            if (vlTabelaElement) {
                // Remove símbolos como '$' ou outros caracteres não numéricos
                const vlTabelaText = vlTabelaElement.textContent.replace(/[^\d.-]/g, '');
                vlTabela = parseFloat(vlTabelaText) || 0;
            }

            if (lucroElement) {
                lucroElement.innerText = lucro.toFixed(2);

                // Atualiza a cor de acordo com o lucro
                if (lucro < 4.99) {
                    statusColor.style.backgroundColor = "#B22222"; // Vermelho
                } else if (lucro >= 5 && lucro <= 9.99) {
                    statusColor.style.backgroundColor = "#FFD700"; // Amarelo
                } else if (lucro >= 10 && lucro <= 14.99) {
                    statusColor.style.backgroundColor = "#3AC628"; // Verde claro
                } else if (lucro >= 15) {
                    statusColor.style.backgroundColor = "#006400"; // Verde escuro
                }

                if (precoProposto < vlTabela && lucro > 0) {
                    statusColor.style.backgroundColor = "#FFD700"; // Amarelo                
                }
                if (quantidade == 0) {
                    statusColor.style.backgroundColor = "#2F3D57"; // PADRAO                
                }
                



            } else {
                console.warn(`Elemento de lucro não encontrado para o produto ${produtoId}`);
            }
        }
    });

}

// Função atualizada para calcular o markup
function calcularMarkup(produtoId) {
    const custo = parseFloat(document.querySelector(`#T${produtoId}`).closest('.modalInfo').querySelector('.cost p').innerText.trim());
    const precoProposto = parseFloat(document.getElementById(`P${produtoId}`).value);

    if (precoProposto > 0 && custo > 0) {
        const markup = (100 - (100 / (precoProposto / custo))).toFixed(4);
        document.getElementById(`M${produtoId}`).innerText = markup;

        calcularLucro(produtoId); // Chama o cálculo do lucro após calcular o markup
    } else {
        document.getElementById(`M${produtoId}`).innerText = '0,0000';
        document.getElementById('LUCRO').innerText = '0,00'; // Zera o lucro se o preço ou custo for inválido
    }
}

// Função para adicionar o event listener a todos os inputs de quantidade e preço
function adicionarEventListeners() {
    const produtos = document.querySelectorAll('.productItem li');

    produtos.forEach(produto => {
        const unitCodeElement = produto.querySelector('.unitCode h2');
        if (unitCodeElement) {
            const produtoId = unitCodeElement.id;

            // Adiciona o event listener para mudança de quantidade
            const quantidadeInput = document.getElementById(`Q${produtoId}`);
            const precoPropostoInput = document.getElementById(`P${produtoId}`);

            if (quantidadeInput && precoPropostoInput) {
                quantidadeInput.addEventListener('input', () => {
                    calcularValorTotal(produtoId);
                });

                precoPropostoInput.addEventListener('input', () => {
                    calcularValorTotal(produtoId);
                });
            } else {
                console.warn(`Inputs não encontrados para o produto ${produtoId}`);
            }
        }
    });
    const mkpBonificacaoInput = document.getElementById(`MKPBONIFICACAO`);
    const mkpContratoInput = document.getElementById(`MKPCONTRATO`);
    mkpBonificacaoInput.addEventListener('input', () => {
        calcularLucro();
        calcularLucroGeral();
    });

    mkpContratoInput.addEventListener('input', () => {
        calcularLucro();
        calcularLucroGeral();
    });
}

// Função para calcular o valor total geral
function calcularVLTOTGERAL() {
    let totalGeral = 0;

    // Percorre todos os produtos e soma os valores totais
    document.querySelectorAll('.vlTotal p').forEach(valorTotalEl => {
        let valorTotal = parseFloat(valorTotalEl.innerText.replace('R$', '').trim()) || 0;
        totalGeral += valorTotal;
    });

    // Atualiza o valor total geral
    document.getElementById('VLTOTGERAL').innerText = `$ ${totalGeral.toFixed(2)}`;
    return totalGeral;
}

// Função para calcular o lucro geral
function calcularLucroGeral() {
    let totalGeral = calcularVLTOTGERAL(); // Calcula o valor total geral
    if (totalGeral === 0) {
        document.getElementById('LUCRO').innerText = '0,00'; // Se o total geral for 0, o lucro é 0
        return;
    }

    let somaLucroPonderado = 0;

    // Percorre todos os produtos e calcula a soma ponderada dos lucros
    document.querySelectorAll('.productItem li').forEach(li => {
        const unitCodeElement = li.querySelector('.unitCode h2');
        if (unitCodeElement) {
            const produtoId = unitCodeElement.id;
            const lucroProd = parseFloat(document.getElementById(`L${produtoId}`).innerText) || 0;
            const vlTotalProd = parseFloat(document.getElementById(`T${produtoId}`).innerText.replace('R$', '').trim()) || 0;

            somaLucroPonderado += lucroProd * vlTotalProd;
        }
    });

    // Calcula o lucro geral como a soma ponderada dos lucros dividida pelo total geral
    const lucroGeral = somaLucroPonderado / totalGeral;

    // Atualiza o valor do lucro geral no DOM
    document.getElementById('LUCRO').innerText = lucroGeral.toFixed(2);
    const statusColorTot = document.querySelector('.fixed-circle');
    const lucroGeralElement = document.getElementById('LUCRO');

    // Aplica as regras de cor de fundo de acordo com o valor de lucro
    if (lucroGeral <= -36) {
        lucroGeralElement.innerText = "0"; // Define o valor como 0
        statusColorTot.style.backgroundColor = "#B22222"; // Vermelho
    } else {
        // Aplicar a cor de fundo conforme o valor do lucro
        if (lucroGeral <= 4.99 && lucroGeral >= -35.99) {
            statusColorTot.style.backgroundColor = "#B22222"; // Vermelho
        } else if (lucroGeral >= 5 && lucroGeral <= 9.99) {
            statusColorTot.style.backgroundColor = "#FFD700"; // Amarelo
        } else if (lucroGeral >= 10 && lucroGeral <= 14.99) {
            statusColorTot.style.backgroundColor = "#3AC628"; // Verde claro
        } else if (lucroGeral >= 15) {
            statusColorTot.style.backgroundColor = "#006400"; // Verde escuro
        }
    }
}

// Controle dos botões de toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggleButton');
    const productItems = document.querySelectorAll('.productItem');

    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const productImage = button.querySelector('.imgAdd');
            const productItem = productItems[index];

            // Verifica se o elemento foi encontrado
            if (productImage && productItem) {
                const currentSrc = productImage.getAttribute('src');

                // Troca o src da imagem
                if (currentSrc.includes('add.svg')) {
                    productImage.setAttribute('src', 'src/assets/remove.svg');
                } else {
                    productImage.setAttribute('src', 'src/assets/add.svg');
                }

                // Alterna entre 'none' e 'flex' no display
                if (productItem.style.display === 'none' || productItem.style.display === '') {
                    productItem.style.display = 'flex';
                } else {
                    productItem.style.display = 'none';
                }
            } else {
                console.error('Elementos não encontrados.');
            }
        });
    });
});

// Controle do painel lateral
document.getElementById('toggleDiv').addEventListener('click', function () {
    const boxLateral = document.getElementById('boxLateral');
    const toggleImage = document.getElementById('toggleImage');

    // Verifica a posição atual da boxLateral e alterna a animação
    if (boxLateral.style.left === '-295px' || boxLateral.style.left === '') {
        boxLateral.style.animation = 'slideIn 0.5s forwards'; // Animação de entrada
        boxLateral.style.left = '0'; // Move para dentro da tela após animação
        toggleImage.src = 'src/assets/arrow_back.svg'; // Altera o src da imagem
    } else {
        boxLateral.style.animation = 'slideOut 0.5s forwards'; // Animação de saída
        boxLateral.style.left = '-295px'; // Move para fora da tela após animação
        toggleImage.src = 'src/assets/arrow_forward.svg'; // Volta para a imagem original
    }
});

// Inicializa os cálculos e eventos ao carregar a página
window.onload = function () {
    adicionarEventListeners();
    calcularLucroGeral(); // Inicializa o cálculo de lucro geral ao carregar a página
};


