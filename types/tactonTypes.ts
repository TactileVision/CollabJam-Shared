import { User } from "./roomTypes";

export interface TactonMetadata {
  name: string;
  iteration: number;
  favorite: boolean;
  recordDate: Date;
  notes: string;
  intention: string;
  prompt: string;
  customTags: string[];
  bodyTags: string[];
}
export interface Tacton {
  uuid: string;
  metadata: TactonMetadata;
  instructions: TactonInstruction[];
}
export interface InstructionSetParameter {
  setParameter: {
    channels: number[];
    intensity: number;
  };
}
export function impl<I>(i: I) {
  return i;
}

export interface InstructionWait {
  wait: {
    miliseconds: number;
  };
}
export interface InstructionSetParameter {
  setParameter: {
    channels: number[];
    intensity: number;
  };
}
export const isInstructionWait = (instruction: TactonInstruction) => {
  return "wait" in instruction;
};
export const isInstructionSetParameter = (instruction: TactonInstruction): instruction is InstructionSetParameter => {
  return "setParameter" in instruction;
};
export type TactonInstruction = InstructionSetParameter | InstructionWait;
export interface InstructionServerPayload {
  Instruction: TactonInstruction;
}
export function getDuration(tacton: Tacton): number {
  let d = 0;
  tacton.instructions
    .filter((i) => {
      return isInstructionWait(i) == true;
    })
    .forEach((i) => {
      d += (i as InstructionWait).wait.miliseconds;
    });
  return d;
}
function hasInstructions(tacton: Tacton): boolean {
  return (
    tacton.instructions.filter((i) => {
      return isInstructionSetParameter(i) == true;
    }).length > 1
  );
}
export function isWellFormed(tacton: Tacton): boolean {
  return getDuration(tacton) > 0 && hasInstructions(tacton);
}

export interface InstructionToClient {
  channels: number[];
  intensity: number;
  author: User | undefined;
  keyId: string | undefined;
}

export interface TactileTask {
  channels: number[];
  intensity: number;
}

//Per Display actions
export interface SetAmplitudeTask {
  channels: number[];
  intensity: number;
}

export interface SetFrequencyTask {
  channels: number[];
  frequency: number;
}

// export interface SetDisplayParameterTask {
// 	channels: number[],
// 	value: number,
// 	type: 'frequency' | 'amplitude'
// }
export interface GraphBlock {
  instructions: TactonInstruction[];
  startMs: number;
  length: number;
  deleted: boolean;
}

export enum StretchType {
  HORIZONTAL,
  VERTICAL
}

export enum StretchDirection {
  NEGATIVE,
  POSITIVE,
}
