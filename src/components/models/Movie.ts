import { CastMember } from "./CastMember";
import { Genre } from "./Genre";

export interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    overview?: string;
    release_date?: string;
    run_time?: number;
    vote_count?: number;
    genres?: Genre[];
    castMembers?: CastMember[];
  }