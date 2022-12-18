import { createContext } from "react";
import { grpc } from "@improbable-eng/grpc-web";
import { GRPC_SERVER_URL } from "../constants/grpc";
import { GrpcWebImpl, ProductListServiceClientImpl } from "../grpc/products";


const rpc = new GrpcWebImpl(GRPC_SERVER_URL, {
    debug: false,
    metadata: new grpc.Metadata({ 'Access-Control-Allow-Origin': '*' })
});

export const client = new ProductListServiceClientImpl(rpc);

const ClientContext = createContext(client);

export default ClientContext;