export interface HouseDocument {
  id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  area: number;
  bedrooms: number;
  bathrooms: number; price: number;
  schoolCount: number;
  pinned: string[];
}
