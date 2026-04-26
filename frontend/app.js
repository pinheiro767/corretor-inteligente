function controlarTipoProva() {
    gerarQuestoes();
}

function gerarQuestoes() {

    const tipo = document.getElementById("tipoProva").value;
    const area = document.getElementById("areaQuestoes");

    area.innerHTML = "";

    if (tipo === "pratica") {
        area.innerHTML = `
            <textarea id="q1" placeholder="Critério da prova prática"></textarea>
        `;
        return;
    }

    let qtd = parseInt(document.getElementById("quantidade").value);

    if (qtd < 1) qtd = 1;
    if (qtd > 70) qtd = 70;

    for (let i = 1; i <= qtd; i++) {
        area.innerHTML += `
            <div class="blocoQuestao">
                <input id="pergunta${i}" placeholder="Pergunta ${i}">
                <textarea id="q${i}" placeholder="Resposta esperada ${i}"></textarea>
            </div>
        `;
    }
}

function gerarPDF() {

    const tipo = document.getElementById("tipoProva").value;

    if (tipo === "pratica") {

    let qtd = parseInt(document.getElementById("quantidade").value);

    if (qtd < 1) qtd = 1;
    if (qtd > 70) qtd = 70;

    for (let i = 1; i <= qtd; i++) {
        area.innerHTML += `
            <input id="q${i}" placeholder="Questão ${i} - resposta correta">
        `;
    }

    return;
}
    let qtd = parseInt(document.getElementById("quantidade").value);

    let janela = window.open("", "_blank");

    let html = `
    <html>
    <head>
    <title>Prova</title>
    <style>
        body{
            font-family:Arial;
            padding:40px;
        }

        h1,h2,h3,p{
            margin:4px 0;
        }

        .cab{
            text-align:center;
            margin-bottom:30px;
        }

        .linha{
            border-bottom:1px solid #000;
            margin:12px 0;
        }

        .questao{
            margin-top:28px;
        }
    </style>
    </head>
    <body>

    <div class="cab">
        <h2>Universidade Estadual de Maringá</h2>
        <h3>Prof. Dra. Cláudia Pinheiro</h3>
        <p>Curso: ______________________________</p>
        <p>Disciplina: Anatomia Humana</p>
        <p>Aluno: ______________________________</p>
    </div>
    `;
        for (let i = 1; i <= qtd; i++) {
        const pergunta = document.getElementById(`pergunta${i}`).value;

        html += `
            <div class="questao">
                <p><b>${i})</b> ${pergunta}</p>
                <div class="linha">&nbsp;</div>
                <div class="linha">&nbsp;</div>
                <div class="linha">&nbsp;</div>
                <div class="linha">&nbsp;</div>
            </div>
        `;
    }

    html += `
    </body>
    </html>
    `;

    janela.document.write(html);
    janela.document.close();
    janela.print();
}

async function corrigir() {

    document.getElementById("painel").classList.add("escondido");
    document.getElementById("carregando").classList.remove("escondido");

    const aluno = document.getElementById("aluno").value;
    const turma = document.getElementById("turma").value;
    const conteudo = document.getElementById("conteudo").value;
    const imagem = document.getElementById("imagem").files[0];

    const tipo = document.getElementById("tipoProva").value;

    let resposta = "";

    if (tipo === "pratica") {
        resposta = document.getElementById("q1").value;
    } else {
        let qtd = parseInt(document.getElementById("quantidade").value);

        for (let i = 1; i <= qtd; i++) {
            const pergunta = document.getElementById(`pergunta${i}`).value;
            const esperada = document.getElementById(`q${i}`).value;

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

    const retorno = await fetch("http://127.0.0.1:8000/corrigir", {
        method: "POST",
        body: formData
    });

    const dados = await retorno.json();

    document.getElementById("carregando").classList.add("escondido");
    document.getElementById("painel").classList.remove("escondido");

    document.getElementById("nota").innerText = dados.nota ?? "--";
    document.getElementById("status").innerText = dados.status ?? "";
    document.getElementById("resAluno").innerText = dados.aluno ?? "";
    document.getElementById("resTurma").innerText = dados.turma ?? "";
    document.getElementById("resConteudo").innerText = dados.conteudo ?? "";
    document.getElementById("respostaAluno").innerText = dados.resposta_aluno ?? "";
    document.getElementById("justificativa").innerText = dados.justificativa ?? "";
}

gerarQuestoes();
function abrirBanco(){

    const painel = document.getElementById("bancoQuestoes");
    const lista = document.getElementById("listaBanco");

    painel.classList.remove("escondido");

    lista.innerHTML = "";

    banco.forEach(q => {

        lista.innerHTML += `
            <div class="itemBanco">
                <label>
                    <input type="checkbox" value="${q.id}">
                    <b>${q.id}</b> - ${q.pergunta}
                    <br>
                    <small>Resposta: ${q.resposta}</small>
                </label>
            </div>
        `;
    });
}

function usarSelecionadas(){

    const marcadas = document.querySelectorAll("#listaBanco input:checked");

    document.getElementById("tipoProva").value = "teorica";

    document.getElementById("quantidade").value = marcadas.length;

    gerarQuestoes();

    marcadas.forEach((item, index) => {

        const id = parseInt(item.value);

        const questao = banco.find(x => x.id === id);

        const n = index + 1;

        document.getElementById(`pergunta${n}`).value = questao.pergunta;
        document.getElementById(`q${n}`).value = questao.resposta;
    });

    document.getElementById("bancoQuestoes").classList.add("escondido");
}
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(erro => console.log("Erro no Service Worker", erro));
}
function abrirCamera() {
    document.getElementById("imagem").click();
}