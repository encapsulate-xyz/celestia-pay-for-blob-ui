import {CallRpcWithPayload} from "../call-rpc-with-payload";

async function processData(data) {
    return data.result
}

export async function submitPfb(ip, port, authToken, namespaceId, commitment, shareVersion, textData) {
    const requestPayload = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "blob.Submit",
        "params": [
            [
                {
                    "namespace": namespaceId,
                    "data": textData,
                    "commitment": commitment,
                    "share_version": shareVersion
                }
            ],
            {
                "Fee": 100000,
                "GasLimit": 100000
            }
        ]
    }

    const data = await CallRpcWithPayload(ip, port, requestPayload, authToken, '', "POST")
    return await processData(data);
}
