
# 🚀 Sistema de Pedido Mobile - Compusa Software

Este projeto foi desenvolvido em **24 horas** para atender uma demanda urgente de um cliente da **Compusa Software**, que precisava de uma interface web responsiva para agilizar o processo de pedidos dos vendedores em campo, integrando-se diretamente ao ERP desktop (desenvolvido em COBOL).

---

## 📦 Funcionalidades

- ✅ **Login de usuários**
- ✅ **Seleção de cliente**
- ✅ **Listagem de produtos agrupados por categorias**
- ✅ **Consulta rápida dos produtos**
- ✅ **Simulação de preços, markup, lucro e condições de pagamento**
- ✅ **Geração de resumo de pedido**
- ✅ **Compatível com dispositivos móveis (100% responsivo)**

---

## 📁 Estrutura de Telas

1. **Tela de Login**
   - Seleção de usuário
   - Campo de senha com toggle de visualização

2. **Tela de Seleção de Cliente**
   - Dropdown para escolha do cliente

3. **Tela de Listagem de Produtos**
   - Agrupamento de produtos por categoria
   - Exibição de:
     - Código
     - Descrição
     - Unidade
     - Markup
     - Preço proposto
     - Quantidade
     - Valor total
     - Indicador visual de status de margem (vermelho, amarelo, verde)

4. **Tela de Consulta de Produto Selecionado**
   - Visualização dos dados de um único produto
   - Preço, quantidade, valor total e markup

---

## 🗺️ Estrutura de Pastas

```
src/
├── assets/               # Imagens e ícones
├── pages/
│   ├── Menu/             # Tela de Login
│   │   ├── menu.html
│   │   ├── menu.css
│   │   └── menu.js
│   ├── selectClient/     # Seleção de Cliente
│   │   ├── selectClient.html
│   │   ├── selectClient.css
│   │   └── selectClient.js
│   ├── productListing/   # Listagem de Produtos
│   │   ├── productListing.html
│   │   ├── productListing.css
│   │   └── productListing.js
│   └── productSelect/    # Detalhe Produto
│       ├── productSelect.html
│       └── productSelect.js
├── styles.css            # Estilo global
```

---

## 🎨 Tecnologias Utilizadas

- **HTML5**
- **CSS3** (com media queries e design responsivo)
- **JavaScript Vanilla** (puro, sem frameworks)
- **Integração com ERP via CGI (programas .exe executando HTML embutido no COBOL)**

---

## 🧠 Lógica de Funcionamento

- Integração direta com o ERP via **CGI**, que injeta os dados dinâmicos no HTML usando variáveis no padrão `:VARIAVEL`.
- Todos os cálculos de:
  - **Valor total**
  - **Markup**
  - **Lucro**
  - **Margens**
  São realizados diretamente no frontend via JavaScript.
- Controle de visibilidade de produtos conforme a quantidade preenchida.
- Cálculo de bonificações, contratos e condições de pagamento (à vista/prazo e frete CIF/FOB) impactando diretamente no markup e no lucro.

---

## 🔗 Integração com ERP

O sistema recebe os dados diretamente do ERP através de **HTML embutido no COBOL**, que injeta valores nos campos com placeholders como:

```
<option value=":ICODIGO-SCR155">:INOME-SCR155</option>
```

Na execução do HTML pelo ERP, esses valores são substituídos automaticamente.

---

## ⚙️ Como Rodar Localmente

1. Clone este repositório.
2. Coloque os arquivos dentro do diretório servido pelo servidor **Apache** configurado para execução via **CGI** (com arquivos `.exe` rodando o HTML).
3. Garanta que as pastas `src/assets` e `src/pages` estejam no caminho correto.
4. Acesse via navegador o endpoint configurado no seu servidor Apache (ex.: `http://localhost/cgi-bin/menu.exe`).

---

## 🚥 Limitações

- Sistema desenvolvido em 24 horas para atender uma demanda emergencial.
- Não possui backend próprio; depende exclusivamente do ERP para fornecer os dados dinâmicos.
- Não possui persistência além do que já é gerenciado pelo ERP.

---

## ✍️ Autor

Desenvolvido por **Gabriel Oliveira** – [LinkedIn](https://www.linkedin.com/in/gabrieloliveiradev/)

---

## 🏢 Empresa

![Logo Compusa](src/assets/logoFooter.png)  
**Compusa Software**  


---
