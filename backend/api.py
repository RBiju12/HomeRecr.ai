from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI()

@app.get('/')
def index():
    return {'Welcome': 'to HomeRec.AI'}

class Home(BaseModel):
    home_id: int 
    address: str
    city: str
    state: str
    zip: int
    area: int # sq foot 
    bedrooms: int 
    bathrooms: float
    price: float 
    future_price: float
    num_schools: int 
    num_parks: int
    crime: float #percentage 


""" Home investment recommendations based on user parameters"""
@app.get("/recomendations")
async def getRec(home_val: int): 
    pass 

""" search function for specific homes"""
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
    results = [home for home in DB if all(func(home) for func in filters.values())]

    if not results:
        raise HTTPException(status_code=404, detail="No homes with the search parameters could be found.")
    
    return results 

""" dashboard of pinned homes """
@app.get("/pinned-homes/{user}")
def get_pinned_homes(user_id: int):
    pass 

""" pinning homes """
@app.post("/pin")
def pin_home(home_id: int, user_id: int):
    pass 

""" unpinning homes """
@app.delete("/unpin")
def unpin_home(home_id: int, user_id: int):
    pass 

""" POTENTIAL GOOGLE MAPS IMPLEMENTATION for proximity to x location"""
@app.get("/proximity")
def get_distance(home_id: int, x: str):
    pass
     
if __name__ == '__main__':
    app.run()



