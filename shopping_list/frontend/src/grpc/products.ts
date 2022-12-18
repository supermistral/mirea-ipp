/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "";

export interface Empty {
}

export interface Product {
  id: number;
  text: string;
  quantity: number;
  createdDate: Date | undefined;
  completed: boolean;
}

export interface ProductList {
  products: Product[];
}

export interface ProductGetRequest {
  id: number;
}

export interface ProductDeleteRequest {
  id: number;
}

export interface ProductAddRequest {
  text: string;
  quantity: number;
  completed: boolean;
}

export interface ProductUpdateRequest {
  id: number;
  text: string;
  quantity: number;
  createdDate: Date | undefined;
  completed: boolean;
}

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseProduct(): Product {
  return { id: 0, text: "", quantity: 0, createdDate: undefined, completed: false };
}

export const Product = {
  encode(message: Product, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    if (message.quantity !== 0) {
      writer.uint32(24).int32(message.quantity);
    }
    if (message.createdDate !== undefined) {
      Timestamp.encode(toTimestamp(message.createdDate), writer.uint32(34).fork()).ldelim();
    }
    if (message.completed === true) {
      writer.uint32(40).bool(message.completed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Product {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProduct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.text = reader.string();
          break;
        case 3:
          message.quantity = reader.int32();
          break;
        case 4:
          message.createdDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.completed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Product {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      text: isSet(object.text) ? String(object.text) : "",
      quantity: isSet(object.quantity) ? Number(object.quantity) : 0,
      createdDate: isSet(object.createdDate) ? fromJsonTimestamp(object.createdDate) : undefined,
      completed: isSet(object.completed) ? Boolean(object.completed) : false,
    };
  },

  toJSON(message: Product): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.text !== undefined && (obj.text = message.text);
    message.quantity !== undefined && (obj.quantity = Math.round(message.quantity));
    message.createdDate !== undefined && (obj.createdDate = message.createdDate.toISOString());
    message.completed !== undefined && (obj.completed = message.completed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Product>, I>>(object: I): Product {
    const message = createBaseProduct();
    message.id = object.id ?? 0;
    message.text = object.text ?? "";
    message.quantity = object.quantity ?? 0;
    message.createdDate = object.createdDate ?? undefined;
    message.completed = object.completed ?? false;
    return message;
  },
};

function createBaseProductList(): ProductList {
  return { products: [] };
}

export const ProductList = {
  encode(message: ProductList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.products) {
      Product.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.products.push(Product.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProductList {
    return { products: Array.isArray(object?.products) ? object.products.map((e: any) => Product.fromJSON(e)) : [] };
  },

  toJSON(message: ProductList): unknown {
    const obj: any = {};
    if (message.products) {
      obj.products = message.products.map((e) => e ? Product.toJSON(e) : undefined);
    } else {
      obj.products = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProductList>, I>>(object: I): ProductList {
    const message = createBaseProductList();
    message.products = object.products?.map((e) => Product.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProductGetRequest(): ProductGetRequest {
  return { id: 0 };
}

export const ProductGetRequest = {
  encode(message: ProductGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductGetRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductGetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProductGetRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: ProductGetRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProductGetRequest>, I>>(object: I): ProductGetRequest {
    const message = createBaseProductGetRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseProductDeleteRequest(): ProductDeleteRequest {
  return { id: 0 };
}

export const ProductDeleteRequest = {
  encode(message: ProductDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductDeleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProductDeleteRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: ProductDeleteRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProductDeleteRequest>, I>>(object: I): ProductDeleteRequest {
    const message = createBaseProductDeleteRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseProductAddRequest(): ProductAddRequest {
  return { text: "", quantity: 0, completed: false };
}

export const ProductAddRequest = {
  encode(message: ProductAddRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).int32(message.quantity);
    }
    if (message.completed === true) {
      writer.uint32(24).bool(message.completed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductAddRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductAddRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        case 2:
          message.quantity = reader.int32();
          break;
        case 3:
          message.completed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProductAddRequest {
    return {
      text: isSet(object.text) ? String(object.text) : "",
      quantity: isSet(object.quantity) ? Number(object.quantity) : 0,
      completed: isSet(object.completed) ? Boolean(object.completed) : false,
    };
  },

  toJSON(message: ProductAddRequest): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    message.quantity !== undefined && (obj.quantity = Math.round(message.quantity));
    message.completed !== undefined && (obj.completed = message.completed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProductAddRequest>, I>>(object: I): ProductAddRequest {
    const message = createBaseProductAddRequest();
    message.text = object.text ?? "";
    message.quantity = object.quantity ?? 0;
    message.completed = object.completed ?? false;
    return message;
  },
};

function createBaseProductUpdateRequest(): ProductUpdateRequest {
  return { id: 0, text: "", quantity: 0, createdDate: undefined, completed: false };
}

export const ProductUpdateRequest = {
  encode(message: ProductUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    if (message.quantity !== 0) {
      writer.uint32(24).int32(message.quantity);
    }
    if (message.createdDate !== undefined) {
      Timestamp.encode(toTimestamp(message.createdDate), writer.uint32(34).fork()).ldelim();
    }
    if (message.completed === true) {
      writer.uint32(40).bool(message.completed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.text = reader.string();
          break;
        case 3:
          message.quantity = reader.int32();
          break;
        case 4:
          message.createdDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.completed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProductUpdateRequest {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      text: isSet(object.text) ? String(object.text) : "",
      quantity: isSet(object.quantity) ? Number(object.quantity) : 0,
      createdDate: isSet(object.createdDate) ? fromJsonTimestamp(object.createdDate) : undefined,
      completed: isSet(object.completed) ? Boolean(object.completed) : false,
    };
  },

  toJSON(message: ProductUpdateRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.text !== undefined && (obj.text = message.text);
    message.quantity !== undefined && (obj.quantity = Math.round(message.quantity));
    message.createdDate !== undefined && (obj.createdDate = message.createdDate.toISOString());
    message.completed !== undefined && (obj.completed = message.completed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProductUpdateRequest>, I>>(object: I): ProductUpdateRequest {
    const message = createBaseProductUpdateRequest();
    message.id = object.id ?? 0;
    message.text = object.text ?? "";
    message.quantity = object.quantity ?? 0;
    message.createdDate = object.createdDate ?? undefined;
    message.completed = object.completed ?? false;
    return message;
  },
};

export interface ProductListService {
  GetAll(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<ProductList>;
  Get(request: DeepPartial<ProductGetRequest>, metadata?: grpc.Metadata): Promise<Product>;
  Add(request: DeepPartial<ProductAddRequest>, metadata?: grpc.Metadata): Promise<Product>;
  Update(request: DeepPartial<ProductUpdateRequest>, metadata?: grpc.Metadata): Promise<Product>;
  Delete(request: DeepPartial<ProductDeleteRequest>, metadata?: grpc.Metadata): Promise<Empty>;
}

export class ProductListServiceClientImpl implements ProductListService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAll = this.GetAll.bind(this);
    this.Get = this.Get.bind(this);
    this.Add = this.Add.bind(this);
    this.Update = this.Update.bind(this);
    this.Delete = this.Delete.bind(this);
  }

  GetAll(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<ProductList> {
    return this.rpc.unary(ProductListServiceGetAllDesc, Empty.fromPartial(request), metadata);
  }

  Get(request: DeepPartial<ProductGetRequest>, metadata?: grpc.Metadata): Promise<Product> {
    return this.rpc.unary(ProductListServiceGetDesc, ProductGetRequest.fromPartial(request), metadata);
  }

  Add(request: DeepPartial<ProductAddRequest>, metadata?: grpc.Metadata): Promise<Product> {
    return this.rpc.unary(ProductListServiceAddDesc, ProductAddRequest.fromPartial(request), metadata);
  }

  Update(request: DeepPartial<ProductUpdateRequest>, metadata?: grpc.Metadata): Promise<Product> {
    return this.rpc.unary(ProductListServiceUpdateDesc, ProductUpdateRequest.fromPartial(request), metadata);
  }

  Delete(request: DeepPartial<ProductDeleteRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(ProductListServiceDeleteDesc, ProductDeleteRequest.fromPartial(request), metadata);
  }
}

export const ProductListServiceDesc = { serviceName: "ProductListService" };

export const ProductListServiceGetAllDesc: UnaryMethodDefinitionish = {
  methodName: "GetAll",
  service: ProductListServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ProductList.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ProductListServiceGetDesc: UnaryMethodDefinitionish = {
  methodName: "Get",
  service: ProductListServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ProductGetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Product.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ProductListServiceAddDesc: UnaryMethodDefinitionish = {
  methodName: "Add",
  service: ProductListServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ProductAddRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Product.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ProductListServiceUpdateDesc: UnaryMethodDefinitionish = {
  methodName: "Update",
  service: ProductListServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ProductUpdateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Product.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ProductListServiceDeleteDesc: UnaryMethodDefinitionish = {
  methodName: "Delete",
  service: ProductListServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ProductDeleteRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
