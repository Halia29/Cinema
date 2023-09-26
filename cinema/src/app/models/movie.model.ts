import { Session } from "./session.model";

export class Movie {
    horizontalImageUrl: string; 
    verticalImageUrl: string;
    title: string;
    description: string;
    premiereDate: Date;
    showingTillDate: Date;
    durationInMinutes: number;
    sessions: { [date: string]: Session[] };
  
    constructor(
      horizontalImageUrl: string,
      verticalImageUrl: string,
      title: string,
      description: string,
      premiereDate: Date,
      showingTillDate: Date,
      durationInMinutes: number,
      sessions: { [date: string]: Session[] }
    ) {
      this.horizontalImageUrl = horizontalImageUrl;
      this.verticalImageUrl = verticalImageUrl;
      this.title = title;
      this.description = description;
      this.premiereDate = premiereDate;
      this.showingTillDate = showingTillDate;
      this.durationInMinutes = durationInMinutes;
      this.sessions = sessions;
    }
}
  
  
  