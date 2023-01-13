// package: 
// file: ichat.proto

import * as jspb from "google-protobuf";

export class Normal extends jspb.Message {
  getFrom(): number;
  setFrom(value: number): void;

  getTo(): number;
  setTo(value: number): void;

  getType(): string;
  setType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Normal.AsObject;
  static toObject(includeInstance: boolean, msg: Normal): Normal.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Normal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Normal;
  static deserializeBinaryFromReader(message: Normal, reader: jspb.BinaryReader): Normal;
}

export namespace Normal {
  export type AsObject = {
    from: number,
    to: number,
    type: string,
  }
}

export class ForDeletion extends jspb.Message {
  getMessageid(): number;
  setMessageid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ForDeletion.AsObject;
  static toObject(includeInstance: boolean, msg: ForDeletion): ForDeletion.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ForDeletion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ForDeletion;
  static deserializeBinaryFromReader(message: ForDeletion, reader: jspb.BinaryReader): ForDeletion;
}

export namespace ForDeletion {
  export type AsObject = {
    messageid: number,
  }
}

export class Normal2 extends jspb.Message {
  getFrom(): number;
  setFrom(value: number): void;

  getTo(): number;
  setTo(value: number): void;

  getMessagetosend(): string;
  setMessagetosend(value: string): void;

  getType(): string;
  setType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Normal2.AsObject;
  static toObject(includeInstance: boolean, msg: Normal2): Normal2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Normal2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Normal2;
  static deserializeBinaryFromReader(message: Normal2, reader: jspb.BinaryReader): Normal2;
}

export namespace Normal2 {
  export type AsObject = {
    from: number,
    to: number,
    messagetosend: string,
    type: string,
  }
}

export class Message extends jspb.Message {
  getMessagetosend(): string;
  setMessagetosend(value: string): void;

  getType(): string;
  setType(value: string): void;

  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    messagetosend: string,
    type: string,
    id: number,
  }
}

export class EmptyMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyMessage): EmptyMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmptyMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyMessage;
  static deserializeBinaryFromReader(message: EmptyMessage, reader: jspb.BinaryReader): EmptyMessage;
}

export namespace EmptyMessage {
  export type AsObject = {
  }
}

