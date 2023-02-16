from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/posts")
async def root():
    posts={ "posts":[
            {"id": 1, "title": "post1", "discriprion":"first post in vue"},
            {"id": 2, "title": "post2", "discriprion":"second post in vue"},
            {"id": 3, "title": "post3", "discriprion":"thirth post in vue"},
        ]          
    }
    return JSONResponse(content=posts)