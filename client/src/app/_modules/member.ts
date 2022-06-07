import { Photo } from './Photo';

export interface RootObject {
  id: number;
  userName: string;
  photoUrl: string;
  age: number;
  knownAs: string;
  created: Date;
  lastActive: Date;
  gender: string;
  introduction: string;
  lookingFor: string;
  skills: string;
  city: string;
  country: string;
  photos: Photo[];
}
