import { FrameCount, FrameRate, IsoDateTimeString, TakeDirectory, TakeId } from "../Flavors";
import { Track } from "./Track";

export interface Take {
  id: TakeId;
  shotNumber: number;
  takeNumber: number;
  takeDirectory: TakeDirectory;
  frameRate: FrameRate;
  holdFrames: FrameCount;
  frameTrack: Track;
  lastSaved: IsoDateTimeString;
}
