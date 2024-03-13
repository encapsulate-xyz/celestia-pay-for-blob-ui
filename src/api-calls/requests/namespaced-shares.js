import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return data
}

export async function getNameSpaceSharesAtHeight(ip, port, authToken, namespaceId, height, commitment) {
    const requestPayload =

        {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "blob.GetAll",
            "params": [
                height,
                [
                    namespaceId
                ]
            ]
        }

    const data = await CallRpcWithPayload(ip, port, requestPayload, authToken, '', "POST")
    return await processData(data);
}
