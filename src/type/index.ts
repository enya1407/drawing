export enum SquareStatus {
    busy = 'busy',
    free = 'free',
    unable  = 'unable',
}
export interface dataType {
    key: string;
    name: string;
    address: string;
    owner: string;
    occupiedAreas: number | null;
    freeAreas: number | null;
    occupancy: number | null;
    squareStatus:SquareStatus;
}
