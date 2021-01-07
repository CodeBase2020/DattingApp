import { Photo } from "./Photo";

export interface Members {
    userName: string;
    Gender: string;
    age:number;
    dateOfBirth: string;
    photoUrl : string;
    knowAs: string;
    created: string;
    lastActive: string;
    introduction: string;
    LookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
  }
  
