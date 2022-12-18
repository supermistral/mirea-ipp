from datetime import datetime
from typing import Dict, Any

from grpc_classes import products_pb2
from google.protobuf.message import Message
from google.protobuf.json_format import MessageToDict


def product_to_protobuf(product):
    proto_product = products_pb2.Product(
        id=product.id,
        text=product.text,
        quantity=product.quantity,
        completed=product.completed
    )
    proto_product.created_date.FromDatetime(product.created_date)
    return proto_product


def product_list_to_protobuf(product_list):
    return list(map(lambda x: product_to_protobuf(x), product_list))


def protobuf_to_dict(proto: Message) -> Dict[str, Any]:
    res = MessageToDict(proto)
    for k, v in list(res.items()):
        if 'Date' in k:
            del res[k]
            new_k = k.replace('Date', '_date')
            try:
                res[new_k] = datetime.strptime(v, "%Y-%m-%dT%H:%M:%S.%f%z")
            except ValueError:
                res[new_k] = datetime.strptime(v, "%Y-%m-%dT%H:%M:%S%f%z")
    return res
