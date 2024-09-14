from fastapi import FastAPI

app = FastAPI()


@app.get('/')
def index():
    return {'Welcome': 'to HomeRec.AI'}


if __name__ == '__main__':
    app.run()