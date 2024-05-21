import exp = require("constants");
import { InteractionMode, Room, User } from "./roomTypes";
import { InstructionToClient, Tacton, TactonMetadata } from "./tactonTypes";

export enum WS_MSG_TYPE {
  GET_AVAILABLE_ROOMS_SERV = "GET_AVAILABLE_ROOMS_SERV",
  GET_AVAILABLE_ROOMS_CLI = "GET_AVAILABLE_ROOMS_CLI",
  ENTER_ROOM_SERV = "ENTER_ROOM_SERV",
  ENTER_ROOM_CLI = "ENTER_ROOM_CLI",
  UPDATE_ROOM_SERV = "UPDATE_ROOM_SERV",
  UPDATE_ROOM_CLI = "UPDATE_ROOM_CLI",
  ENTER_UPDATE_ROOM_CLI = "ENTER_UPDATE_ROOM_CLI",
  // NO_CHANGE_ROOM_CLI = "NO_CHANGE_ROOM_CLI",
  ROOM_INFO_CLI = "ROOM_INFO_CLI",
  ROOM_INFO_SERV = "ROOM_INFO_SERV",
  UPDATE_USER_ACCOUNT_SERV = "UPDATE_USER_ACCOUNT_SERV",
  UPDATE_USER_ACCOUNT_CLI = "UPDATE_USER_ACCOUNT_CLI",
  LOG_OUT = "LOG_OUT",

  SEND_INSTRUCTION_SERV = "SEND_INSTRUCTION_SERV",
  SEND_INSTRUCTION_CLI = "SEND_INSTRUCTION_CLI",
  // UPDATE_RECORD_MODE_SERV = "UPDATE_RECORD_MODE_SERV",
  // UPDATE_RECORD_MODE_CLI = "UPDATE_RECORD_MODE_CLI",
  UPDATE_ROOM_MODE_SERV = "UPDATE_ROOM_MODE_SERV",
  UPDATE_ROOM_MODE_CLI = "UPDATE_ROOM_MODE_CLI",
  CHANGE_DURATION_SERV = "CHANGE_DURATION_SERV",
  CHANGE_DURATION_CLI = "CHANGE_DURATION_CLI",
  CHANGE_ROOMINFO_TACTON_PREFIX_SERV = "CHANGE_ROOMINFO_TACTON_PREFIX_SERV",
  CHANGE_ROOMINFO_TACTON_PREFIX_CLI = "CHANGE_ROOMINFO_TACTON_PREFIX_CLI",
  PING = "PING",
  PONG = "PONG",

  GET_TACTON_SERV = "GET_TACTON_SERV",
  GET_TACTON_CLI = "GET_TACTON_CLI",
  UPDATE_TACTON_SERV = "UPDATE_TACTON_SERV",
  UPDATE_TACTON_CLI = "UPDATE_TACTON_CLI",
  CHANGE_TACTON_METADATA_SERV = "CHANGE_TACTON_METADATA_SERV",
  CHANGE_TACTON_METADATA_CLI = "CHANGE_TACTON_METADATA_CLI",
  PLAY_TACTON_SERV = "PLAY_TACT_SERV",
  PLAY_TACTON_CLI = "PLAY_TACT_CLI",
  STOP_TACTON_SERV = "STOP_TACT_SERV",
  STOP_TACTON_CLI = "STOP_TACT_CLI",
  SELECT_TACTON_SERV = "SELECT_TACT_SERV",
  SELECT_TACTON_CLI = "SELECT_TACT_CLI",
}

export interface ClientToServerEvents {
  GET_AVAILABLE_ROOMS_SERV: () => void,
  ENTER_ROOM_SERV: (req: RequestEnterRoom) => void
  SEND_INSTRUCTION_SERV: (req: RequestSendTactileInstruction) => void
  UPDATE_ROOM_MODE_SERV: (req: UpdateRoomMode) => void
  LOG_OUT: (req: RequestUpdateUser) => void
}

export interface ServerToClientEvents {
  GET_AVAILABLE_ROOMS_CLI: (room: Room[]) => void
  ENTER_ROOM_CLI: (res: ResponseEnteredRoom) => void
  SEND_INSTRUCTION_CLI: (res: InstructionToClient[]) => void
  UPDATE_USER_ACCOUNT_CLI: (res: User[]) => void
  UPDATE_ROOM_MODE_CLI: (req: UpdateRoomMode) => void,
  GET_TACTON_CLI: (res: Tacton) => void,
}
export interface ChangeTactonMetadata {
  roomId: string;
  tactonId: string;
  metadata: TactonMetadata;
}

export interface UpdateTacton {
  roomId: string;
  tactonId: string;
  tacton: Tacton;
}

export interface UpdateRoomMode {
  roomId: string;
  newMode: InteractionMode;
  tactonId: string | undefined;
}

export interface RequestEnterRoom {
  id: string;
  userName: string;
}

export interface ResponseEnteredRoom {
  room: Room;
  userId: string;
  participants: User[];
  recordings: Tacton[];
}

export interface RequestUpdateRoom {
  room: {
    id: string;
    name: string;
    description: string;
  };
  user: User;
}

export interface ResponseUpdatedRoom {
  room: Room;
  participants: User[]; //includes own user profile
}

export interface ResponseRoomInfo {
  existRoom: boolean;
  roomInfo: Room;
  participants: User[];
}

export interface RequestUpdateUser {
  roomId: string;
  user: User;
}

export interface RequestSendTactileInstruction {
  roomId: string;
  instructions: InstructionToClient[];
}

export type SocketMessage =
  | MsgRequestUpdateRoom
  | MsgResponseReceivedRecordedTacton
  | MsgResponseUpdatedRoom
  | MsgRequestFilenamePrefixChange
  // | MsgHearbeat
  | MsgChangeTactonMetadata
  | MsgUpdateTacton
  | MsgRequestAvailableRooms
  | MsgListOfAvailableRooms
  | MsgRequestEnterRoom
  | MsgResponseEnteredRoom
  | MsgRequestUpdateRoomMode
  | MsgResponseUpdatedRoomMode
  | MsgRequestRoomInfo
  | MsgResponseRoomInfo
  | MsgRequestUpdateUser
  | MsgResponseUpdatedUser
  | MsgRequestLogOutUser
  | MsgRequestSendTactileInstruction
  | MsgRequestReceiveTactileInstruction
  | MsgRequestDurationChange
  | MsgResponseDurationChanged;

export interface MsgRequestAvailableRooms {
  type: WS_MSG_TYPE.GET_AVAILABLE_ROOMS_SERV;
  payload: Record<string, never>; //empty object
}
export interface MsgListOfAvailableRooms {
  type: WS_MSG_TYPE.GET_AVAILABLE_ROOMS_CLI;
  payload: Room[];
}
export interface MsgChangeTactonMetadata {
  type:
  | WS_MSG_TYPE.CHANGE_TACTON_METADATA_CLI
  | WS_MSG_TYPE.CHANGE_TACTON_METADATA_SERV;
  payload: ChangeTactonMetadata;
}

export interface MsgUpdateTacton {
  type: WS_MSG_TYPE.UPDATE_TACTON_CLI | WS_MSG_TYPE.UPDATE_TACTON_SERV;
  payload: UpdateTacton;
}

export interface MsgRequestEnterRoom {
  type: WS_MSG_TYPE.ENTER_ROOM_SERV;
  payload: RequestEnterRoom;
}

export interface MsgResponseEnteredRoom {
  type: WS_MSG_TYPE.ENTER_ROOM_CLI;
  payload: ResponseEnteredRoom;
}

export interface MsgResponseUpdatedRoom {
  type: WS_MSG_TYPE.UPDATE_ROOM_CLI;
  payload: ResponseUpdatedRoom;
}
export interface MsgRequestUpdateRoomMode {
  type: WS_MSG_TYPE.UPDATE_ROOM_MODE_SERV;
  payload: UpdateRoomMode;
}

export interface MsgResponseUpdatedRoomMode {
  type: WS_MSG_TYPE.UPDATE_ROOM_MODE_CLI;
  payload: UpdateRoomMode;
}

export interface MsgRequestRoomInfo {
  type: WS_MSG_TYPE.ROOM_INFO_SERV;
  payload: string; //uuid;
}

export interface MsgResponseRoomInfo {
  type: WS_MSG_TYPE.ROOM_INFO_CLI;
  payload: ResponseRoomInfo;
}

export interface MsgRequestUpdateUser {
  type: WS_MSG_TYPE.ROOM_INFO_SERV;
  payload: RequestUpdateUser;
}

export interface MsgResponseUpdatedUser {
  type: WS_MSG_TYPE.UPDATE_USER_ACCOUNT_CLI;
  payload: { participants: User[] };
}

export interface MsgRequestLogOutUser {
  type: WS_MSG_TYPE.LOG_OUT;
  payload: RequestUpdateUser;
}

export interface MsgRequestSendTactileInstruction {
  type: WS_MSG_TYPE.SEND_INSTRUCTION_SERV;
  payload: RequestSendTactileInstruction;
}

export interface MsgRequestReceiveTactileInstruction {
  type: WS_MSG_TYPE.SEND_INSTRUCTION_CLI;
  payload: InstructionToClient[];
}

export interface MsgRequestDurationChange {
  type: WS_MSG_TYPE.CHANGE_DURATION_SERV;
  payload: { roomId: string; duration: number };
}

export interface MsgResponseDurationChanged {
  type: WS_MSG_TYPE.CHANGE_DURATION_CLI;
  payload: number; //duration in ms;
}

export interface MsgRequestFilenamePrefixChange {
  type: WS_MSG_TYPE.CHANGE_ROOMINFO_TACTON_PREFIX_SERV;
  payload: {
    roomId: string;
    prefix: string;
  };
}

export interface MsgResponseReceivedRecordedTacton {
  type: WS_MSG_TYPE.GET_TACTON_CLI;
  payload: Tacton;
}

export interface MsgRequestUpdateRoom {
  type: WS_MSG_TYPE.UPDATE_ROOM_SERV;
  payload:
  | {
    room: {
      id: string;
      name: string;
      description: string;
    };
    user: {
      id: string;
      name: string;
    };
  }
  | RequestUpdateRoom;
}
