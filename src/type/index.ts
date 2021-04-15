export interface AllDataType {
  key: number;
  squareStatus: squareStatusType;
  occupancy: number;
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
  valueEnteredBlock: BlockType;
}

export interface squareStatusType {
  occupiedAreas: number;
  freeAreas: number;
  inaccessibleAreas: number;
}
export interface BlockType {
  savedField: number[];
  floorsVisible: number[];
}
