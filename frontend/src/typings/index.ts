export interface HomeDocument {
  id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  area: number;
  Bedrooms: number;
  Bathrooms: number; price: number;
  Price: number;
  Num_Schools: number;
  pins: number;
}

export interface UserDocument {
  userId: number;
  email: string;
  pinnedHomes: number[];
}
