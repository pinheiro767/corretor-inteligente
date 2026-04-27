from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
from google.genai import types
import os
import json

# =========================
# CONFIG INICIAL
# =========================
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("⚠️ ERRO: GEMINI_API_KEY não encontrada!")

client = genai.Client(api_key=API_KEY)

# =========================
# ROTA TESTE
# =========================
@app.get("/")
def home():
    return {"status": "online", "app": "Corretor Inteligente"}

# =========================
# ROTA PRINCIPAL
# =========================
@app.post("/corrigir")
async def corrigir(
    aluno: str = Form(...),
    turma: str = Form(...),
    conteudo: str = Form(...),
    resposta: str = Form(...),
    imagem: UploadFile = File(None)  # 👈 agora opcional
):
    try:

        # =========================
        # VALIDAÇÃO
        # =========================
        if not API_KEY:
            return {"erro": "API key não configurada"}

        if imagem is None:
            return {"erro": "Envie uma imagem da prova"}

        imagem_bytes = await imagem.read()

        # =========================
        # PROMPT
        # =========================
        prompt = f"""
Você é um professor corretor.

Corrija a resposta da prova enviada na imagem.

Dados:
Aluno: {aluno}
Turma: {turma}
Conteúdo: {conteudo}

Questões e respostas esperadas:
{resposta}

Tarefas:
1. Leia toda a prova na imagem.
2. Identifique respostas por questão.
3. Compare com o gabarito.
4. Conte acertos e erros.
5. Gere nota de 0 a 10.
6. Classifique: correta, parcial ou incorreta.
7. Explique resumidamente.

Responda SOMENTE em JSON válido:

{{
  "aluno": "{aluno}",
  "turma": "{turma}",
  "conteudo": "{conteudo}",
  "resposta_aluno": "Resumo das respostas",
  "acertos": 0,
  "erros": 0,
  "status": "correta | parcial | incorreta",
  "nota": 0,
  "justificativa": "..."
}}
"""

        # =========================
        # CHAMADA GEMINI
        # =========================
        resposta_gemini = client.models.generate_content(
            model="gemini-1.5-flash",  # 👈 mais estável
            contents=[
                types.Part.from_bytes(
                    data=imagem_bytes,
                    mime_type=imagem.content_type or "image/jpeg"
                ),
                prompt
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.1
            )
        )

        texto = resposta_gemini.text

        # =========================
        # CONVERTE JSON
        # =========================
        try:
            dados = json.loads(texto)
        except Exception:
            return {
                "erro": "Resposta não veio em JSON válido",
                "resposta_bruta": texto
            }

        return dados

    except Exception as e:
        # =========================
        # ERRO GERAL
        # =========================
        return {
            "erro": "Erro interno no servidor",
            "detalhes": str(e)
        }
        from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app.mount("/static", StaticFiles(directory="../frontend"), name="static")

@app.get("/")
def serve_front():
    return FileResponse("../frontend/index.html")
