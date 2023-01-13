// package: 
// file: ichat.proto

var ichat_pb = require("./ichat_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ChatService = (function () {
  function ChatService() {}
  ChatService.serviceName = "ChatService";
  return ChatService;
}());

ChatService.GetMessage = {
  methodName: "GetMessage",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: ichat_pb.Normal,
  responseType: ichat_pb.Message
};

ChatService.ReadTypingMessages = {
  methodName: "ReadTypingMessages",
  service: ChatService,
  requestStream: false,
  responseStream: true,
  requestType: ichat_pb.Normal,
  responseType: ichat_pb.Message
};

ChatService.SendTypingMessage = {
  methodName: "SendTypingMessage",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: ichat_pb.Normal2,
  responseType: ichat_pb.EmptyMessage
};

ChatService.ListNotifications = {
  methodName: "ListNotifications",
  service: ChatService,
  requestStream: false,
  responseStream: true,
  requestType: ichat_pb.Normal,
  responseType: ichat_pb.Message
};

ChatService.ListMessages = {
  methodName: "ListMessages",
  service: ChatService,
  requestStream: false,
  responseStream: true,
  requestType: ichat_pb.Normal,
  responseType: ichat_pb.Message
};

ChatService.SendMessage = {
  methodName: "SendMessage",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: ichat_pb.Normal2,
  responseType: ichat_pb.Message
};

ChatService.DeleteMessage = {
  methodName: "DeleteMessage",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: ichat_pb.ForDeletion,
  responseType: ichat_pb.EmptyMessage
};

exports.ChatService = ChatService;

function ChatServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ChatServiceClient.prototype.getMessage = function getMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.GetMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.readTypingMessages = function readTypingMessages(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(ChatService.ReadTypingMessages, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.sendTypingMessage = function sendTypingMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.SendTypingMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.listNotifications = function listNotifications(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(ChatService.ListNotifications, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.listMessages = function listMessages(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(ChatService.ListMessages, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.sendMessage = function sendMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.SendMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.deleteMessage = function deleteMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.DeleteMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ChatServiceClient = ChatServiceClient;

