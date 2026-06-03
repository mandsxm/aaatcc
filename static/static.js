document.addEventListener("DOMContentLoaded", () => {

    const botaoCriarconta = document.getElementById("btn-criarconta");

    if (botaoCriarconta) {
        botaoCriarconta.addEventListener("click", () => {
            window.location.href = "/criarconta";
        });
    }

    const botaoEntrar = document.getElementById("btn-entrar");

    if (botaoEntrar) {
        botaoEntrar.addEventListener("click", () => {
            window.location.href = "/tabela";
        });
    }

    const botaoCriar = document.getElementById("btn-criar");

    if (botaoCriar) {
        botaoCriar.addEventListener("click", () => {
            window.location.href = "/tabela";
        });
    }

});