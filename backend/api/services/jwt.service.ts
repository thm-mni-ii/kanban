import * as jose from 'jose'

export type FbsGlobalRoles = "ADMIN"|"MODERATOR"|"USER";

export type FbsJwtUser = {
    id: number;
    username: string;
    globalRole: FbsGlobalRoles;
}

export class JwtValidator {
    readonly #secret: Buffer;
    public constructor(secret: string) {
        this.#secret = Buffer.from(secret);
    }

    public async validate(token: string): Promise<FbsJwtUser|null> {
        try {
            const {payload} = await jose.jwtVerify(token, this.#secret, {})
            return {
                id: payload.id as number,
                username: payload.username as string,
                globalRole: payload.globalRole as FbsGlobalRoles,
            }
        } catch (e) {
            console.error(e)
            return null
        }
    }
}
