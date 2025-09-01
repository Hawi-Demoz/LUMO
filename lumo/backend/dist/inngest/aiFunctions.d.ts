export declare const processChatMessage: import("inngest").InngestFunction<Omit<import("inngest").InngestFunction.Options<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, import("inngest").InngestMiddleware.Stack, [{
    event: string;
}], import("inngest").Handler<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    error: Error;
    event: import("inngest").FailureEventPayload<import("inngest").EventPayload<any>>;
    logger: import("inngest/middleware/logger").Logger;
}>>, "triggers">, ({ event, step }: import("inngest").Context<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    logger: import("inngest/middleware/logger").Logger;
}>) => Promise<{
    response: string;
    analysis: any;
    updatedMemory: any;
}>, import("inngest").Handler<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    error: Error;
    event: import("inngest").FailureEventPayload<import("inngest").EventPayload<any>>;
    logger: import("inngest/middleware/logger").Logger;
}>, import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, import("inngest").InngestMiddleware.Stack, [{
    event: string;
}]>;
export declare const analyzeTherapySession: import("inngest").InngestFunction<Omit<import("inngest").InngestFunction.Options<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, import("inngest").InngestMiddleware.Stack, [{
    event: string;
}], import("inngest").Handler<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    error: Error;
    event: import("inngest").FailureEventPayload<import("inngest").EventPayload<any>>;
    logger: import("inngest/middleware/logger").Logger;
}>>, "triggers">, ({ event, step }: import("inngest").Context<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    logger: import("inngest/middleware/logger").Logger;
}>) => Promise<{
    message: string;
    analysis: any;
}>, import("inngest").Handler<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    error: Error;
    event: import("inngest").FailureEventPayload<import("inngest").EventPayload<any>>;
    logger: import("inngest/middleware/logger").Logger;
}>, import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, import("inngest").InngestMiddleware.Stack, [{
    event: string;
}]>;
export declare const generateActivityRecommendations: import("inngest").InngestFunction<Omit<import("inngest").InngestFunction.Options<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, import("inngest").InngestMiddleware.Stack, [{
    event: string;
}], import("inngest").Handler<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    error: Error;
    event: import("inngest").FailureEventPayload<import("inngest").EventPayload<any>>;
    logger: import("inngest/middleware/logger").Logger;
}>>, "triggers">, ({ event, step }: import("inngest").Context<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    logger: import("inngest/middleware/logger").Logger;
}>) => Promise<{
    message: string;
    recommendations: any;
}>, import("inngest").Handler<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    error: Error;
    event: import("inngest").FailureEventPayload<import("inngest").EventPayload<any>>;
    logger: import("inngest/middleware/logger").Logger;
}>, import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, import("inngest").InngestMiddleware.Stack, [{
    event: string;
}]>;
export declare const functions: import("inngest").InngestFunction<Omit<import("inngest").InngestFunction.Options<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, import("inngest").InngestMiddleware.Stack, [{
    event: string;
}], import("inngest").Handler<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    error: Error;
    event: import("inngest").FailureEventPayload<import("inngest").EventPayload<any>>;
    logger: import("inngest/middleware/logger").Logger;
}>>, "triggers">, ({ event, step }: import("inngest").Context<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    logger: import("inngest/middleware/logger").Logger;
}>) => Promise<{
    response: string;
    analysis: any;
    updatedMemory: any;
}>, import("inngest").Handler<import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, string, {
    error: Error;
    event: import("inngest").FailureEventPayload<import("inngest").EventPayload<any>>;
    logger: import("inngest/middleware/logger").Logger;
}>, import("inngest").Inngest<{
    id: string;
    eventKey: string;
}>, import("inngest").InngestMiddleware.Stack, [{
    event: string;
}]>[];
//# sourceMappingURL=aiFunctions.d.ts.map