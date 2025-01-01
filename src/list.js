import { Doom } from "./doom";

export const list =(a=[])=>a.map(r=>r instanceof Doom ? r : new Doom(r))