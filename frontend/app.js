// =========================
// INIT
// =========================
window.onload = () => {
    gerarQuestoes();

    const qtdInput = document.getElementById("quantidade");
    if (qtdInput) {
        qtdInput.addEventListener("change", gerarQuestoes);
    }
};

// =========================
// TIPO DE PROVA
// =========================
function controlarTipoProva() {
    gerarQuestoes();
}

// =========================
// GERAR QUESTÕES
// =========================
function gerarQuestoes() {

    const tipo = document.getElementById("tipoProva")?.value;
    const area = document.getElementById("areaQuestoes");

    if (!area) return;

    area.innerHTML = "";

    if (tipo === "pratica") {
        area.innerHTML = `
            <textarea id="q1" placeholder="Critério da prova prática"></textarea>
        `;
        return;
    }

    let qtd = parseInt(document.getElementById("quantidade")?.value) || 1;
    qtd = Math.max(1, Math.min(70, qtd));

    let html = "";

    for (let i = 1; i <= qtd; i++) {
        html += `
            <div class="blocoQuestao">
                <input id="pergunta${i}" placeholder="Pergunta ${i}">
                <textarea id="q${i}" placeholder="Resposta esperada ${i}"></textarea>
            </div>
        `;
    }

    area.innerHTML = html;
}

// =========================
// BANCO DE QUESTÕES
// =========================
function abrirBanco() {

    if (typeof banco === "undefined") {
        alert("Banco de questões não carregado 🚨");
        return;
    }

    const painel = document.getElementById("bancoQuestoes");
    const lista = document.getElementById("listaBanco");

    if (!painel || !lista) return;

    painel.classList.remove("escondido");
    lista.innerHTML = "";

    banco.forEach(q => {
        lista.innerHTML += `
            <div class="itemBanco">
                <label>
                    <input type="checkbox" value="${q.id}">
                    <b>${q.id}</b> - ${q.pergunta}
                    <br>
                    <small>${q.resposta}</small>
                </label>
            </div>
        `;
    });
}

// =========================
// USAR QUESTÕES DO BANCO
// =========================
function usarSelecionadas() {

    const marcadas = document.querySelectorAll("#listaBanco input:checked");

    if (marcadas.length === 0) {
        alert("Selecione pelo menos uma questão");
        return;
    }

    document.getElementById("tipoProva").value = "teorica";
    document.getElementById("quantidade").value = marcadas.length;

    gerarQuestoes();

    marcadas.forEach((item, index) => {

        const id = parseInt(item.value);
        const questao = banco.find(x => x.id === id);
        const n = index + 1;

        if (!questao) return;

        document.getElementById(`pergunta${n}`).value = questao.pergunta;
        document.getElementById(`q${n}`).value = questao.resposta;
    });

    document.getElementById("bancoQuestoes").classList.add("escondido");
}

// =========================
// GERAR PDF
// =========================
function gerarPDF() {

    let qtd = parseInt(document.getElementById("quantidade")?.value);

    if (!qtd || qtd < 1) {
        alert("Defina a quantidade de questões");
        return;
    }

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita pop-ups 🚨");
        return;
    }

    let html = `
    <html>
    <head>
    <title>Prova</title>
    <style>
        body { font-family:Arial; padding:40px; }
        .cab { text-align:center; margin-bottom:30px; }
        .linha { border-bottom:1px solid #000; margin:12px 0; }
        .questao { margin-top:25px; }
    </style>
    </head>
    <body>

    <div class="cab">
        <h2>Prova</h2>
        <p>Aluno: __________________________</p>
    </div>
    `;

    for (let i = 1; i <= qtd; i++) {

        const pergunta = document.getElementById(`pergunta${i}`)?.value || "";

        html += `
            <div class="questao">
                <p><b>${i})</b> ${pergunta}</p>
                <div class="linha"></div>
                <div class="linha"></div>
                <div class="linha"></div>
            </div>
        `;
    }

    html += "</body></html>";

    janela.document.write(html);
    janela.document.close();

    setTimeout(() => janela.print(), 500);
}

// =========================
// CORRIGIR PROVA
// =========================
async function corrigir() {

    const painel = document.getElementById("painel");
    const carregando = document.getElementById("carregando");

    try {

        painel.classList.add("escondido");
        carregando.classList.remove("escondido");

        const aluno = document.getElementById("aluno")?.value || "";
        const turma = document.getElementById("turma")?.value || "";
        const conteudo = document.getElementById("conteudo")?.value || "";
        const imagem = document.getElementById("imagem")?.files[0];

        if (!imagem) {
            throw new Error("Envie uma imagem da prova 📷");
        }

        const tipo = document.getElementById("tipoProva")?.value;

        let resposta = "";

        if (tipo === "pratica") {
            resposta = document.getElementById("q1")?.value || "";
        } else {

            let qtd = parseInt(document.getElementById("quantidade")?.value) || 1;

            for (let i = 1; i <= qtd; i++) {

                const pergunta = document.getElementById(`pergunta${i}`)?.value || "";
                const esperada = document.getElementById(`q${i}`)?.value || "";

                resposta += `Questão ${i}\n`;
                resposta += `Pergunta: ${pergunta}\n`;
                resposta += `Resposta esperada: ${esperada}\n\n`;
            }
        }

        const formData = new FormData();
        formData.append("aluno", aluno);
        formData.append("turma", turma);
        formData.append("conteudo", conteudo);
        formData.append("resposta", resposta);
        formData.append("imagem", imagem);

        const API_URL = window.location.origin;

        const retorno = await fetch(`${API_URL}/corrigir`, {
            method: "POST",
            body: formData
        });

        if (!retorno.ok) {
            throw new Error("Erro no servidor");
        }

        const dados = await retorno.json();

        document.getElementById("nota").innerText = dados.nota ?? "--";
        document.getElementById("status").innerText = dados.status ?? "";
        document.getElementById("resAluno").innerText = dados.aluno ?? "";
        document.getElementById("resTurma").innerText = dados.turma ?? "";
        document.getElementById("resConteudo").innerText = dados.conteudo ?? "";
        document.getElementById("respostaAluno").innerText = dados.resposta_aluno ?? "";
        document.getElementById("justificativa").innerText = dados.justificativa ?? "";

    } catch (erro) {

        alert(erro.message || "Erro ao conectar 🚨");
        console.error(erro);

    } finally {

        carregando.classList.add("escondido");
        painel.classList.remove("escondido");
    }
}

// =========================
// CAMERA
// =========================
function abrirCamera() {
    document.getElementById("imagem")?.click();
}
