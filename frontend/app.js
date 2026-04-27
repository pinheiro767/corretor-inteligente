function controlarTipoProva() {
    gerarQuestoes();
}

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

        // 🔥 FUNCIONA LOCAL E PRODUÇÃO
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
        // 🔥 GARANTE QUE SEMPRE VOLTA
        carregando.classList.add("escondido");
        painel.classList.remove("escondido");
    }
}

function abrirCamera() {
    document.getElementById("imagem")?.click();
}

gerarQuestoes();
