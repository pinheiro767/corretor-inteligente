from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

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
# SERVIR FRONTEND
# =========================
app.mount("/static", StaticFiles(directory="../frontend"), name="static")

@app.get("/")
def serve_front():
    return FileResponse("../frontend/index.html")


# =========================
# ROTA PRINCIPAL
# =========================
@app.post("/corrigir")
async def corrigir(
    aluno: str = Form(...),
    turma: str = Form(...),
    conteudo: str = Form(...),
    resposta: str = Form(...),
    imagem: UploadFile = File(None)
):
    try:

        if not API_KEY:
            return {"erro": "API key não configurada"}

        if imagem is None:
            return {"erro": "Envie uma imagem da prova"}

        imagem_bytes = await imagem.read()

        prompt = f"""
Você é um professor corretor.

Dados:
Aluno: {aluno}
Turma: {turma}
Conteúdo: {conteudo}

Questões e respostas esperadas:
{resposta}

Corrija a prova da imagem e responda em JSON:

{{
  "aluno": "{aluno}",
  "turma": "{turma}",
  "conteudo": "{conteudo}",
  "resposta_aluno": "Resumo",
  "acertos": 0,
  "erros": 0,
  "status": "correta | parcial | incorreta",
  "nota": 0,
  "justificativa": "..."
}}
"""

        resposta_gemini = client.models.generate_content(
            model="gemini-1.5-flash",
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

        try:
            dados = json.loads(texto)
        except Exception:
            return {
                "erro": "Resposta não veio JSON",
                "resposta_bruta": texto
            }

        return dados

    except Exception as e:
        return {
            "erro": "Erro interno",
            "detalhes": str(e)
        }
