async function publicarLivro() {

    var titulo = document.getElementById("titulo").value.trim();
    var conteudo = document.getElementById("conteudo").value.trim();
    var autor = localStorage.getItem("usuarioAtual");

    if (titulo === "" || conteudo === "") {
        alert("Não dá pra mandar o livro assim, escreva algo");
        return;
    }

    var resultado = await supabaseClient
        .from("livros")
        .insert([
            {
                titulo: titulo,
                conteudo: conteudo,
                autor: autor
            }
        ]);

    if (resultado.error) {
        console.error("ERRO AO PUBLICAR:", resultado.error);
        alert("Não ta dando pra publicar o livro");
        return;
    }

    alert("Livro publicado pra sua mor já");

    window.location.href = "biblioteca.html";
}


function voltarBiblioteca() {
    window.location.href = "biblioteca.html";
}