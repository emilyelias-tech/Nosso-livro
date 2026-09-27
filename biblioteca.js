var usuarioAtual = localStorage.getItem("usuarioAtual");

if (!usuarioAtual) {
    window.location.href = "index.html";
}

document.getElementById("mensagemUsuario").textContent =
    "oie, " + usuarioAtual + "!";


async function mostrarLivros() {

    var lista = document.getElementById("listaLivros");

    lista.innerHTML = "<p>Carregando livros...</p>";

    var resultado = await supabaseClient
        .from("livros")
        .select("*")
        .order("created_at", { ascending: true });

    if (resultado.error) {

        console.error(
            "ERRO DO SUPABASE:",
            resultado.error
        );

        lista.innerHTML =
            "<p>Erro: " + resultado.error.message + "</p>";

        return;
    }

    var livros = resultado.data;

    lista.innerHTML = "";

    if (livros.length === 0) {

        lista.innerHTML = `
            <div class="biblioteca-vazia">
                <div class="livro-vazio">♡</div>

                <p>Ainda não tem nada de livro aqui</p>

                <span>
                    Pode começar a criar ai já
                </span>
            </div>
        `;

        return;
    }


    livros.forEach(function(livro) {

        var card = document.createElement("div");

        card.className = "livro-card";

        card.innerHTML = `
            <div class="mini-capa">

                <div class="mini-decoracao">
                    ✦ ♡ ✦
                </div>


                <h2>
                    ${livro.titulo}
                </h2>

                <div class="mini-linha"></div>

                <p>
                    Por ${livro.autor}
                </p>

                <div class="mini-coracao">
                    ♡
                </div>

            </div>

            <button
                class="botao-ler"
                onclick="lerLivro(${livro.id})">
                Ler livro
            </button>
        `;

        lista.appendChild(card);


        var capa = card.querySelector(".mini-capa");

        var tempoPressionado;


        // CELULAR
        capa.addEventListener("touchstart", function() {

            tempoPressionado = setTimeout(function() {
                confirmarApagar(livro.id, livro.titulo);
            }, 1000);

        });


        capa.addEventListener("touchend", function() {

            clearTimeout(tempoPressionado);

        });


        capa.addEventListener("touchmove", function() {

            clearTimeout(tempoPressionado);

        });


        // COMPUTADOR
        capa.addEventListener("mousedown", function() {

            tempoPressionado = setTimeout(function() {
                confirmarApagar(livro.id, livro.titulo);
            }, 1000);

        });


        capa.addEventListener("mouseup", function() {

            clearTimeout(tempoPressionado);

        });


        capa.addEventListener("mouseleave", function() {

            clearTimeout(tempoPressionado);

        });

    });
}


function criarLivro() {

    window.location.href = "criar-livro.html";
}


function lerLivro(id) {

    localStorage.setItem(
        "livroSelecionado",
        id
    );

    window.location.href = "ler-livro.html";
}


async function confirmarApagar(id, titulo) {

    var confirmar = confirm(
        'quer mesmo apagar o livro "' + titulo + '"?'
    );

    if (!confirmar) {
        return;
    }


    var resultado = await supabaseClient
        .from("livros")
        .delete()
        .eq("id", id);


    if (resultado.error) {

        console.error(
            "ERRO AO APAGAR:",
            resultado.error
        );

        alert(
            "Não ta dando pra apagar o livro"
        );

        return;
    }


    alert("Livro apagado mor");

    mostrarLivros();
}


mostrarLivros();