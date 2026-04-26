from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
from google.genai import types
import os
import json

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.get("/")
def home():
    return {"status": "online", "app": "Corretor Inteligente"}

@app.post("/corrigir")
async def corrigir(
    aluno: str = Form(...),
    turma: str = Form(...),
    conteudo: str = Form(...),
    resposta: str = Form(...),
    imagem: UploadFile = File(...)
):
    imagem_bytes = await imagem.read()

    prompt = f"""
Você é um professor corretor.

Corrija a resposta da prova enviada na imagem.

Dados:
Aluno: {aluno}
Turma: {turma}
Conteúdo: {conteudo}

RQuestões e respostas esperadas:
{resposta}

Tarefas:
1. Leia toda a prova na imagem.
2. Identifique respostas por questão.
3. Compare cada questão com o gabarito enviado.
4. Conte acertos e erros.
5. Gere nota de 0 a 10 proporcional.
6. Diga se desempenho geral foi correta, parcial ou incorreta.
7. Explique resumidamente.

Responda somente em JSON válido, neste formato:

{{
  "aluno": "{aluno}",
  "turma": "{turma}",
  "conteudo": "{conteudo}",
  "resposta_aluno": "Resumo das respostas identificadas",
"acertos": 0,
"erros": 0,
  "status": "correta | parcial | incorreta",
  "nota": 0,
  "justificativa": "..."
}}
"""

    resposta_gemini = client.models.generate_content(
        model="gemini-2.5-flash",
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

    try:
        dados = json.loads(resposta_gemini.text)
    except Exception:
        dados = {
            "erro": "Não consegui transformar a resposta em JSON.",
            "resposta_bruta": resposta_gemini.text
        }

    return dados