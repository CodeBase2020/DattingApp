import { Photo } from "./Photo";

export interface Members {
    username: string;
    Gender: string;
    age:number;
    dateOfBirth: string;
    photoUrl : string;
    knowAs: string;
    created: string;
    lastActive: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
  }
  
