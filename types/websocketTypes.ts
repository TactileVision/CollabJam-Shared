import { InteractionMode, InteractionModeChange } from "./roomTypes";
import { TactonMetadata } from "./tactonTypes";

export enum WS_MSG_TYPE {
  GET_AVAILABLE_ROOMS_SERV = "GET_AVAILABLE_ROOMS_SERV",
  GET_AVAILABLE_ROOMS_CLI = "GET_AVAILABLE_ROOMS_CLI",
  ENTER_ROOM_SERV = "ENTER_ROOM_SERV",
  ENTER_ROOM_CLI = "ENTER_ROOM_CLI",
  UPDATE_ROOM_SERV = "UPDATE_ROOM_SERV",
  UPDATE_ROOM_CLI = "UPDATE_ROOM_CLI",
  ENTER_UPDATE_ROOM_CLI = "ENTER_UPDATE_ROOM_CLI",
  NO_CHANGE_ROOM_CLI = "NO_CHANGE_ROOM_CLI",
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
}

export interface ChangeTactonMetadata {
  roomId: string;
  tactonId: string;
  metadata: TactonMetadata;
}

export interface UpdateRoomMode {
  roomId: string;
  newMode: InteractionMode;
  tactonId: string | undefined;
}
