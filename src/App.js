import './App.css';
import './components/css/Button.css';
import React, {useState} from 'react';
import {ReturnApp} from "./components/AppUI";
import config from './config';
import {submitPfb} from "./api-calls/requests/submit-pfb";
import {getNameSpaceSharesAtHeight} from "./api-calls/requests/namespaced-shares";
import {jsonToHtml} from "./helper/pretty-print-json";
import {generateRandHexEncodedNamespaceID, textToHex} from "./helper/text-to-hex";
import {delay} from "./helper/delay";


function App() {
    const [loadOnClick, setLoadOnClick] = useState(false);
    const load = async () => {
        console.log('Calculating...');
        addLoadingClass();
        try {
            await Promise.all([
                computeResults(), // Start executing computeResults
                delay(2000) // Wait for 2 seconds
            ]);
        } catch (error) {
            console.error(error);
            handleError(config.backend.apiFailureMessage)
        } finally {
            removeLoadingClass();
        }
    };

    const addLoadingClass = () => {
        const button = document.getElementById('button');
        if (button) {
            button.classList.add('loading');
            const progress = document.createElement('div');
            progress.className = 'progress';
            button.appendChild(progress);
        }
    };

    const removeLoadingClass = () => {
        const button = document.getElementById('button');
        if (button) {
            button.classList.remove('loading');
            const progress = button.lastChild;
            if (progress instanceof Node) {
                button.removeChild(progress);
            }
        }
    };

    const computeResults = () => {
        return new Promise(async (resolve) => {
            console.log("loading");
            let { ip, port,authToken, namespaceId, commitment, shareVersion, textData} = readInput();
            textData = textToHex(textData);

            console.log(namespaceId, textData);

            if (!ip || !port || !authToken || !textData || !namespaceId) {
                handleError(config.missingValuesMessage);
                return resolve(); // Resolve the promise if there's an error
            }

            try {
                const [height] = await Promise.all([submitPfb(ip, port,authToken, namespaceId, commitment, shareVersion, textData)]);

                console.log(`height: ${height}`);

                if (
                    [height].some(
                        (value) =>
                            value === null || value === undefined || Number.isNaN(value)
                    )
                ) {
                    handleError(config.backend.apiFailureMessage);
                    return resolve(); // Resolve the promise if there's an error
                }

                const sharesAtHeight = await getNameSpaceSharesAtHeight(
                    ip, port,authToken,
                    namespaceId,
                    height,
                    commitment
                );

                if (
                    [sharesAtHeight].some(
                        (value) =>
                            value === null || value === undefined || Number.isNaN(value)
                    )
                ) {
                    handleError(config.backend.apiFailureMessage);
                    return resolve(); // Resolve the promise if there's an error
                }

                const uiResponsePrettyJson = await jsonToHtml(sharesAtHeight);
                updateUI(namespaceId, uiResponsePrettyJson);
                removeLoadingClass();
                setLoadOnClick(true);
            } catch (e) {
                console.log(config.backend.apiFailureMessage);
                handleError(config.backend.apiFailureMessage);
            }

            resolve(); // Resolve the promise at the end of the function
        });
    };


    const readInput = () => {
        const ip = document.getElementById('field-0').value // || generateRandHexEncodedNamespaceID();
        const port = document.getElementById('field-1').value;
        const authToken = document.getElementById('field-2').value;
        const namespaceId = document.getElementById('field-3').value;
        const commitment = document.getElementById('field-4').value;
        const shareVersion = parseInt(document.getElementById('field-5').value);
        const textData = document.getElementById('textarea-0').value;

        return {ip, port,authToken, namespaceId, commitment, shareVersion, textData};
    };

    const handleError = (message) => {
        alert(message);
        removeLoadingClass();
    };

    const updateUI = (namespaceId, uiResponsePrettyJson) => {
        document.getElementById('resultBox-0').innerHTML = namespaceId
        document.getElementById('resultBox-1').innerHTML = uiResponsePrettyJson
    };

    return (<ReturnApp load={load} config={config}/>);
}

export default App;
