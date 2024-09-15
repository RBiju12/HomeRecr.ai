export interface HomeDocument {
  id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  area: number;
  bedrooms: number;
  bathrooms: number; 
  price: number;
  Price: number;
  num_schools: number;
  pins: number;
}

export interface UserDocument {
  userId: number;
  email: string;
  pinnedHomes: number[];
}
