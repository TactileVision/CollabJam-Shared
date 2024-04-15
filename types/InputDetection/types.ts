import { UserInput } from "@sharedTypes/InputDetection/InputDetection";
import { InputDevice } from "@sharedTypes/InputDetection/InputBindings";
import { InputAdapter } from "@/main/Input/InputDetection/InputAdapter/InputAdapterRegistry";

export interface InputEvent {
  device: InputDevice;
  input: UserInput;
  value: number;
  wasActive: boolean;
}

export interface InputDetectionConfig {
  adapters: readonly InputAdapter[];
  axesThreshold: number;
  buttonThreshold: number;
  throttleTimeout: number;
  onInput: (event: InputEvent) => void;
}

export interface InputDetection {
  config: InputDetectionConfig;
  start: () => void;
  stop: () => void;
}
