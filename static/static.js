document.addEventListener("DOMContentLoaded", () => {

    // BOTÃO "ENTRAR"
    const botao = document.getElementById("Entrar");
    if (botao) {
        botao.addEventListener("click", () => {
            window.location.href = "/tabela";
        });
    }

    // BOTÃO "CRIAR UMA CONTA"
    const botaoCriarconta = document.getElementById("btn-criarconta");
    if (botaoCriarconta) {
        botaoCriarconta.addEventListener("click", () => {
            window.location.href = "/criarconta";
        });
    }

    // BOTÃO "CRIAR CONTA"
    const botaoCriar = document.getElementById("btn-criar");
    if (botaoCriar) {
        botaoCriar.addEventListener("click", () => {
            window.location.href = "/tabela";
        });
    }

    // MOVIMENTAÇÃO
    const btnEntrada = document.getElementById("btnEntrada");
    const btnSaida = document.getElementById("btnSaida");
    const btnRegistrar = document.getElementById("btnRegistrar");
    const btnUpload = document.getElementById("btnUpload");

    let tipoMovimentacao = "";

    function limparSelecao() {
        if (btnEntrada) btnEntrada.classList.remove("btn-selecionado");
        if (btnSaida) btnSaida.classList.remove("btn-selecionado");
    }

    if (btnEntrada) {
        btnEntrada.addEventListener("click", () => {
            tipoMovimentacao = "entrada";
            limparSelecao();
            btnEntrada.classList.add("btn-selecionado");
        });
    }

    if (btnSaida) {
        btnSaida.addEventListener("click", () => {
            tipoMovimentacao = "saida";
            limparSelecao();
            btnSaida.classList.add("btn-selecionado");
        });
    }

    window.excluirItem = async function(id) {
        if (!confirm("Tem certeza que deseja excluir este item?")) return;

        const resposta = await fetch(`/excluir/${id}`, { method: "DELETE" });
        const data = await resposta.json();

        if (data.success) {
            alert("Item excluído com sucesso!");
            location.reload();
        } else {
            alert("Erro ao excluir");
        }
    }

    if (btnRegistrar) {
        btnRegistrar.addEventListener("click", async () => {
            if (tipoMovimentacao === "") {
                alert("Selecione Entrada ou Saída.");
                return;
            }

            const formData = new FormData();
            formData.append("nome", document.getElementById("item").value);
            formData.append("qtde", document.getElementById("quantidade").value);
            formData.append("responsavel", document.getElementById("responsavel").value);
            formData.append("tipo", tipoMovimentacao);

            const imagem = document.getElementById("fileInput").files[0];
            if (imagem) formData.append("imagem", imagem);

            const resposta = await fetch("/entrada", { method: "POST", body: formData });
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