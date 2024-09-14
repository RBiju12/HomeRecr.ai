from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from propelauth_fastapi import init_auth, User
import os
from dotenv import load_dotenv

app = FastAPI()

load_dotenv(dotenv_path="./keys.env")

origins = [
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

propel_url = os.getenv("PROPELAUTH_URL")
propel_auth_key = os.getenv("PROPELAUTH_KEY")

auth = init_auth(auth_url=propel_url, api_key=propel_auth_key)


@app.get('/')
def index():
    return {'Welcome': 'to HomeRec.AI'}

@app.get("/api/auth")
def read_user(user: User = Depends(auth.require_user)):
    return {"Hello": user.email}


if __name__ == '__main__':
    app.run()