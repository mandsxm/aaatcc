// MUDAR PARA PÁGINA TABELA
const botao = document.getElementById("Entrar");

if (botao) {
    botao.addEventListener("click", () => {
        console.log("teste");
        window.location.href = "/tabela";
    });
}

// ADICIONAR ITENS
window.addEventListener("DOMContentLoaded", () => {

    console.log("JS carregou com sucesso");

    const btnEntrada = document.getElementById("btnEntrada");
    const btnSaida = document.getElementById("btnSaida");
    const btnRegistrar = document.getElementById("btnRegistrar");
    const btnUpload = document.getElementById("btnUpload");

    let tipoMovimentacao = "";

    if (btnEntrada) {
        btnEntrada.addEventListener("click", () => {
            tipoMovimentacao = "entrada";
            console.log("Entrada selecionada");
        });
    }

    if (btnSaida) {
        btnSaida.addEventListener("click", () => {
            tipoMovimentacao = "saida";
            console.log("Saída selecionada");
        });
    }

    if (btnRegistrar) {
        btnRegistrar.addEventListener("click", async () => {

            if (tipoMovimentacao === "") {
                alert("Selecione Entrada ou Saída.");
                return;
            }

            const item = document.getElementById("item").value;
            const quantidade = document.getElementById("quantidade").value;
            const responsavel = document.getElementById("responsavel").value;
            const imagem = document.getElementById("fileInput").files[0];

            const formData = new FormData();

            formData.append("nome", item);
            formData.append("qtde", quantidade);
            formData.append("responsavel", responsavel);

            if (imagem) {
                formData.append("imagem", imagem);
            }

            formData.append("tipo", tipoMovimentacao);

            const resposta = await fetch("/entrada", {
                method: "POST",
                body: formData
            });

            const data = await resposta.json();

            if (data.success) {
                alert("Registro salvo com sucesso!");
                window.location.href = "/tabela";
            } else {
                alert("Erro ao salvar");
            }
        });
    }

    if (btnUpload) {
        btnUpload.addEventListener("click", () => {
            document.getElementById("fileInput").click();
        });
    }

});