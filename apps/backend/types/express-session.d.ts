import 'express-session'

declare module 'express-session' {
    interface SessionData {
        user: Record<string, any>;
    }
}

// export {};