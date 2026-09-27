function validarLogin() {

    var email = document.getElementById("email").value.trim();
    var senha = document.getElementById("senha").value;

    var vitoriaEmail = "alexandrino@123";
    var vitoriaSenha = "1104";

    var emilyEmail = "elias@123";
    var emilySenha = "1104";


    if (email === vitoriaEmail && senha === vitoriaSenha) {

        localStorage.setItem("usuarioAtual", "Ponei");

        window.location.href = "biblioteca.html";

    }

    else if (email === emilyEmail && senha === emilySenha) {

        localStorage.setItem("usuarioAtual", "Elias");

        window.location.href = "biblioteca.html";

    }

    else {

        alert("Vixi, não foi... tente novamente!");

    }

}