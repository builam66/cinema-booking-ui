export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'premium' | 'vip';
  isAvailable: boolean;
  price: number;
}
