export interface WeekSchedule {
  start: string;
  end: string;
  isAvalilable: boolean;
}

export interface AvaliableWeek {
  day: string;
  dayValue: number;
  start: string;
  end: string;
  schedules: WeekSchedule[];
}

export interface Area {
  img: string;
  name: string;
  description: string;
  invitatios?: number;
  autoApproval?: boolean;
  locationType?: 'clube' | 'evento';
  simultaneousReservations?: number;
  isEventInUnit?: boolean;
  guests?: {
    id: string;
    doc: string;
    name: string;
    photo: string;
    observations: string;
    isRestricted: boolean;
    events: {
      id: string;
      name: string;
      date: string;
      occourence: string;
      isAuthorized: boolean;
    }[];
  }[];
  avaliability: {
    period: { start: string; end: string };
    reseved: {
      date: string;
      schedules: { start: string; end: string }[];
      isDateFullReserved: boolean;
    }[];
    week: AvaliableWeek[];
  };
}
