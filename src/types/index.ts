export type TribeTier = 'TRIBE' | 'TRIBE_PLUS' | 'INNER_CIRCLE';

export interface Member {
  _id: string;
  email: string;
  name: string;
  tier: TribeTier;
  points: number;
  joinedAt: Date;
  lastVisit?: Date;
}

export interface NightclubEvent {
  _id: string;
  title: string;
  date: Date;
  genre: string[];
  capacity: number;
  currentAttendance: number;
  price: number;
  pointsReward: number;
}

export interface Ticket {
  _id: string;
  eventId: string;
  memberId: string;
  qrCode: string;
  isScanned: boolean;
  purchasedAt: Date;
}
