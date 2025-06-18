const selectUser = document.getElementById('inputUser');

selectUser.addEventListener('change', function() {
    if (this.value === "") {
        this.style.color = "#aaa"; // Cor do placeholder
    } else {
        this.style.color = "#000"; // Cor do texto após seleção
    }
});