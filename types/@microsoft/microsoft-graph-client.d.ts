export class AuthenticationHandler {
    static AUTHORIZATION_HEADER: string;
    constructor(authenticationProvider: any);
    authenticationProvider: any;
    execute(context: any): any;
    setNext(next: any): void;
}
export class AuthenticationHandlerOptions {
    constructor(authenticationProvider: any, authenticationProviderOptions: any);
    authenticationProvider: any;
    authenticationProviderOptions: any;
}
export class BatchRequestContent {
    static getRequestBody(request: any): any;
    static getRequestData(request: any): any;
    static requestLimit: number;
    static validateDependencies(requests: any): any;
    constructor(requests: any);
    requests: any;
    addDependency(dependentId: any, dependencyId: any): void;
    addRequest(request: any): any;
    getContent(): any;
    removeDependency(dependentId: any, dependencyId: any): any;
    removeRequest(requestId: any): any;
}
export class BatchResponseContent {
    constructor(response: any);
    responses: any;
    createResponseObject(responseJSON: any): any;
    getResponseById(requestId: any): any;
    getResponses(): any;
    getResponsesIterator(): any;
    update(response: any): void;
}
export class Client {
    static init(options: any): any;
    static initWithMiddleware(clientOptions: any): any;
    constructor(clientOptions: any);
    config: any;
    httpClient: any;
    api(path: any): any;
}
export class GraphError {
    constructor(statusCode: any);
    statusCode: any;
    code: any;
    message: any;
    requestId: any;
    date: any;
    body: any;
}
export class GraphRequest {
    constructor(httpClient: any, config: any, path: any);
    parsePath: any;
    httpClient: any;
    config: any;
    urlComponents: any;
    addCsvQueryParameter(propertyName: any, propertyValue: any, additionalProperties: any): void;
    buildFullUrl(): any;
    count(isCount: any): any;
    create(content: any, callback: any): any;
    createQueryString(): any;
    del(callback: any): any;
    expand(properties: any, ...args: any[]): any;
    filter(filterStr: any): any;
    get(callback: any): any;
    getStream(callback: any): any;
    header(headerKey: any, headerValue: any): any;
    headers(headers: any): any;
    middlewareOptions(options: any): any;
    option(key: any, value: any): any;
    options(options: any): any;
    orderby(properties: any, ...args: any[]): any;
    patch(content: any, callback: any): any;
    post(content: any, callback: any): any;
    put(content: any, callback: any): any;
    putStream(stream: any, callback: any): any;
    query(queryDictionaryOrString: any): any;
    responseType(responseType: any): any;
    search(searchStr: any): any;
    select(properties: any, ...args: any[]): any;
    send(request: any, options: any, callback: any): any;
    skip(n: any): any;
    skipToken(token: any): any;
    top(n: any): any;
    update(content: any, callback: any): any;
    updateRequestOptions(options: any): void;
    version(version: any): any;
}
export class HTTPMessageHandler {
    execute(context: any): any;
}
export class OneDriveLargeFileUploadTask {
    static DEFAULT_UPLOAD_PATH: string;
    static constructCreateSessionUrl(fileName: any, path: any): any;
    static create(client: any, file: any, options: any): any;
    static createUploadSession(client: any, requestUrl: any, fileName: any): any;
    constructor(client: any, file: any, uploadSession: any, options: any);
    cancel(): any;
    commit(requestUrl: any): any;
    getNextRange(): any;
    getStatus(): any;
    parseRange(ranges: any): any;
    resume(): any;
    sliceFile(range: any): any;
    updateTaskStatus(response: any): void;
    upload(): any;
    uploadSlice(fileSlice: any, range: any, totalSize: any): any;
}
export class PageIterator {
    constructor(client: any, pageCollection: any, callback: any);
    client: any;
    collection: any;
    nextLink: any;
    deltaLink: any;
    callback: any;
    complete: any;
    fetchAndUpdateNextPageData(): any;
    getDeltaLink(): any;
    isComplete(): any;
    iterate(): any;
    iterationHelper(): any;
    resume(): any;
}
export const ResponseType: {
    ARRAYBUFFER: string;
    BLOB: string;
    DOCUMENT: string;
    JSON: string;
    RAW: string;
    STREAM: string;
    TEXT: string;
};
export class RetryHandler {
    static RETRY_AFTER_HEADER: string;
    static RETRY_ATTEMPT_HEADER: string;
    static RETRY_STATUS_CODES: number[];
    static TRANSFER_ENCODING_CHUNKED: string;
    static TRANSFER_ENCODING_HEADER: string;
    constructor(options: any);
    options: any;
    execute(context: any): any;
    executeWithRetry(context: any, retryAttempts: any, options: any): any;
    getDelay(response: any, retryAttempts: any, delay: any): any;
    getExponentialBackOffTime(attempts: any): any;
    getOptions(context: any): any;
    isBuffered(request: any, options: any): any;
    isRetry(response: any): any;
    setNext(next: any): void;
    sleep(delaySeconds: any): any;
}
export class RetryHandlerOptions {
    static DEFAULT_DELAY: number;
    static DEFAULT_MAX_RETRIES: number;
    static DEFAULT_SHOULD_RETRY(): any;
    static MAX_DELAY: number;
    static MAX_MAX_RETRIES: number;
    constructor(delay: any, maxRetries: any, shouldRetry: any);
    delay: any;
    maxRetries: any;
    shouldRetry: any;
    getMaxDelay(): any;
}
