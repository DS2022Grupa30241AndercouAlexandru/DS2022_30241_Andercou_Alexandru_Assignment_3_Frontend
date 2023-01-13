// package: 
// file: ichat.proto

import * as ichat_pb from "./ichat_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ChatServiceGetMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ichat_pb.Normal;
  readonly responseType: typeof ichat_pb.Message;
};

type ChatServiceReadTypingMessages = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof ichat_pb.Normal;
  readonly responseType: typeof ichat_pb.Message;
};

type ChatServiceSendTypingMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ichat_pb.Normal2;
  readonly responseType: typeof ichat_pb.EmptyMessage;
};

type ChatServiceListNotifications = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof ichat_pb.Normal;
  readonly responseType: typeof ichat_pb.Message;
};

type ChatServiceListMessages = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof ichat_pb.Normal;
  readonly responseType: typeof ichat_pb.Message;
};

type ChatServiceSendMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ichat_pb.Normal2;
  readonly responseType: typeof ichat_pb.Message;
};

type ChatServiceDeleteMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ichat_pb.ForDeletion;
  readonly responseType: typeof ichat_pb.EmptyMessage;
};

export class ChatService {
  static readonly serviceName: string;
  static readonly GetMessage: ChatServiceGetMessage;
  static readonly ReadTypingMessages: ChatServiceReadTypingMessages;
  static readonly SendTypingMessage: ChatServiceSendTypingMessage;
  static readonly ListNotifications: ChatServiceListNotifications;
  static readonly ListMessages: ChatServiceListMessages;
  static readonly SendMessage: ChatServiceSendMessage;
  static readonly DeleteMessage: ChatServiceDeleteMessage;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ChatServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getMessage(
    requestMessage: ichat_pb.Normal,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ichat_pb.Message|null) => void
  ): UnaryResponse;
  getMessage(
    requestMessage: ichat_pb.Normal,
    callback: (error: ServiceError|null, responseMessage: ichat_pb.Message|null) => void
  ): UnaryResponse;
  readTypingMessages(requestMessage: ichat_pb.Normal, metadata?: grpc.Metadata): ResponseStream<ichat_pb.Message>;
  sendTypingMessage(
    requestMessage: ichat_pb.Normal2,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ichat_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  sendTypingMessage(
    requestMessage: ichat_pb.Normal2,
    callback: (error: ServiceError|null, responseMessage: ichat_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  listNotifications(requestMessage: ichat_pb.Normal, metadata?: grpc.Metadata): ResponseStream<ichat_pb.Message>;
  listMessages(requestMessage: ichat_pb.Normal, metadata?: grpc.Metadata): ResponseStream<ichat_pb.Message>;
  sendMessage(
    requestMessage: ichat_pb.Normal2,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ichat_pb.Message|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: ichat_pb.Normal2,
    callback: (error: ServiceError|null, responseMessage: ichat_pb.Message|null) => void
  ): UnaryResponse;
  deleteMessage(
    requestMessage: ichat_pb.ForDeletion,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ichat_pb.EmptyMessage|null) => void
  ): UnaryResponse;
  deleteMessage(
    requestMessage: ichat_pb.ForDeletion,
    callback: (error: ServiceError|null, responseMessage: ichat_pb.EmptyMessage|null) => void
  ): UnaryResponse;
}

