from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from propelauth_fastapi import init_auth, User
import os
from dotenv import load_dotenv
import spacy
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = FastAPI()

load_dotenv(dotenv_path="./keys.env")

uri = os.getenv("MONGOAUTH_URI")

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(e)


db = client["HomeRecData"]

#database for homes
homes = db["homes"]


#database for users 
users = db["users"]

allHomes = homes.aggregate([])

print(allHomes.next())

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

# home objects
class Home(BaseModel):
    home_id: int 
    address: str
    city: str
    state: str
    zip: int
    area: int # sq foot 
    bedrooms: int 
    bathrooms: float
    current_price: float 
    interest_rates: float 
    num_schools: int 
    num_parks: int
    num_restuarants: int

@app.get('/')
def index():
    return {'Welcome': 'to HomeRec.AI'}
    
# AUTHENTICATION METHOD WITH PROPELAUTH 
@app.get("/auth")
def read_user(user: User = Depends(auth.require_user)):
    return {"Hello": user.email}

# 
@app.get("/recomendations")
async def getRec(home_val: int): 
    """ Home investment recommendations based on user parameters"""
    pass 

# SEARCH METHOD
@app.get("/search", response_model=List[Home])
async def getHomes(    
    home_id: Optional[int] = None,
    address: Optional[str] = None,
    city: Optional[str] = None,
    state: Optional[str] = None,
    zip: Optional[int] = None,
    min_area: Optional[int] = None,
    max_area: Optional[int] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    bedrooms: Optional[int] = None,
    bathrooms: Optional[float] = None): 
    """ search function for specific homes"""
    filters = {
        "home_id": home_id,
        "address": lambda home: address.lower() in home["address"].lower() if address else True,
        "city": lambda home: home["city"].lower() == city.lower() if city else True,
        "state": lambda home: home["state"].lower() == state.lower() if state else True,
        "zip": lambda home: home["zip"] == zip if zip else True, 
        "min_area": lambda home: home["area"] >= min_area if min_area else True, 
        "max_area": lambda home: home["area"] <= max_area if max_area else True, 
        "min_price": lambda home: home["price"] >= min_price if min_price else True,
        "max_price": lambda home: home["price"] <= max_price if max_price else True,
        "bedrooms": lambda home: home["bedrooms"] >= bedrooms if bedrooms else True,
        "bathrooms": lambda home: home["bathrooms"] <= bathrooms if bathrooms else True,
    }
    # need to make homes database
    results = [home for home in homes.find()]

    if not results:
        raise HTTPException(status_code=404, detail="No homes with the search parameters could be found.")
    
    return results 

# DASHBOARD METHODS 
@app.get("/dashboard/")
def get_pinned_homes(user_id: int):
    """ dashboard of pinned homes """
    pass 


@app.post("/search/pin")
async def pin_home(home_id: int, user_id: int):
    """ adds home_id to array of ints (representing home_id) associated with a user document in mongoDB """

    user = await users.find_one({"user_id": user_id})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if home_id in user.get("pinned_homes", []):
        raise HTTPException(status_code=400, detail="Home already pinned")

    result = await users.update_one(
        {"user_id": user_id},
        {"$addToSet": {"pinned_homes": home_id}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Home could not be pinned or Home doesn't exist.")

    return {"result": "Home pinned"}

@app.delete("/dashboard/unpin")
async def unpin_home(home_id: int, user_id: int):
    """ deletes home_id from array of home ids in a user document"""

    user = await users.find_one({"user_id": user_id})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if home_id not in user.get("pinned_homes", []):
        raise HTTPException(status_code=404, detail="Home not pinned")
    
    result = await users.update_one(
        {"user_id": user_id},
        {"$pull": {"pinned_homes": home_id}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Home could not be unpinned or Home doesn't exist.")

    return {"result": "Home unpinned"}

    
# GOOGLE MAPS IMPLEMENTATION 
@app.get("/proximity")
def get_distance(home_id: int, x: str):
    """ POTENTIAL GOOGLE MAPS IMPLEMENTATION for proximity to x location"""
    pass


if __name__ == '__main__':
    app.run()





