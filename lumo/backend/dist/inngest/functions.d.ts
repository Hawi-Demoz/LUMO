export declare const therapySessionHandler: import("inngest").InngestFunction<Omit<import("inngest").InngestFunction.Options<import("inngest").Inngest<{
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
    sessionId: any;
    processedData: any;
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
export declare const moodTrackingHandler: import("inngest").InngestFunction<Omit<import("inngest").InngestFunction.Options<import("inngest").Inngest<{
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
    analysis: {
        recommendations: string[];
        trend: string;
    };
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
export declare const activityCompletionHandler: import("inngest").InngestFunction<Omit<import("inngest").InngestFunction.Options<import("inngest").Inngest<{
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
    progress: {
        completedActivities: number;
        totalPoints: number;
    };
    achievements: {
        newAchievements: string[];
    };
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
//# sourceMappingURL=functions.d.ts.map