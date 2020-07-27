function buildParams(endpoint, params) {
    const url = window.location.origin + endpoint;
    console.log(url);
    let builtUrl = new URL(url);
    Object.keys(params).forEach((key) => {
        builtUrl.searchParams.append(key, params[key])
    });
    return builtUrl;
}

export {
    buildParams
}