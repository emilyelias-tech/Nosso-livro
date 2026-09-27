var idLivro = localStorage.getItem("livroSelecionado");

async function carregarLivro() {

    if (!idLivro) {
        document.getElementById("tituloLivro").textContent =
            "Livro não encontrado.";
        return;
    }

    var resultado = await supabaseClient
        .from("livros")
        .select("*")
        .eq("id", idLivro)
        .single();

    if (resultado.error) {
        console.error("ERRO AO CARREGAR LIVRO:", resultado.error);

        document.getElementById("tituloLivro").textContent =
            "Livro não encontrado.";

        return;
    }

    var livro = resultado.data;

    document.getElementById("tituloLivro").textContent =
        livro.titulo;

    document.getElementById("autorLivro").textContent =
        "Por " + livro.autor;

    document.getElementById("conteudoLivro").textContent =
        livro.conteudo;
}

function voltarBiblioteca() {
    window.location.href = "biblioteca.html";
}

carregarLivro();