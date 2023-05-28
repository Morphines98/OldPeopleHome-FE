
export interface DayOfWeek {
  dayId: string;
  displayName: string;
  fullName: string;
}

export interface OptionGroup {
  label: string;
  value: string;
}


export class WorkingTimeForDay {
  dayId: string;
  workingIntervals?: DayTimeline[];

  constructor(dayId: string) {
    this.dayId = dayId;
    this.workingIntervals = [];
  }
}

export class DayTimeline {
  startHours: string;
  endHours: string;

  constructor(startHours: string, endHours: string) {
    this.startHours = startHours;
    this.endHours = endHours;
  }
}
