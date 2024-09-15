export interface HomeDocument {
  id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: string;
  Price: number;
  num_schools: number;
  pins: number;
  nextYearPercent: number;
}

export interface UserDocument {
  userId: number;
  email: string;
  pinnedHomes: number[];
}
