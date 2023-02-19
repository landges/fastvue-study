from . import models
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status, APIRouter, Response
from .database import get_db
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/posts")
async def root(db: Session = Depends(get_db), limit: int = 10, page: int = 1,search: str = ''):
    skip = (page - 1) * limit

    posts = db.query(models.Note).limit(limit).offset(skip).all()
    return {'status': 'success', 'results': len(posts), 'posts': posts}