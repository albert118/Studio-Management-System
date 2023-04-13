const defaultRequestOptions = Object.freeze({
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default defaultRequestOptions;
