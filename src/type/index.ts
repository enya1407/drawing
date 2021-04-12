export interface BasicDataType {
  key: string;
  name: string;
  address: string;
  owner: string;
  occupiedAreas: number | null;
  freeAreas: number | null;
  occupancy: number | null;
}
export interface AllDataType {
  address: any;
  blocks: any;
  class: any;
  comment: any;
  commissioning: any;
  execution: any;
  fullArea: any;
  name: any;
  numberOfStoreys: any;
  objectNumber: any;
  owner: any;
  rentableArea: any;
}

export interface squareStatusType {
  occupiedAreas: number;
  freeAreas: number;
  inaccessibleAreas: number;
}
