import "dotenv/config"

export function readRequiredEnv(handle: string): string {
    const value = process.env[handle];
    if(!value) throw new Error(`Missing required env:, ${handle}`);
    return value;
}

export const env = {
    PORT: process.env.PORT,
    jwtSecret: readRequiredEnv("JWT_SECRET")
}
