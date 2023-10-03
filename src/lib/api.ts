import { redirect } from "next/navigation";

export namespace Api {
    export type OkResponse = any;
    export type ErrResponse = {
        statusCode: number;
        code?: string;
        error: string;
        message: string;
    };

    class _Response<TResponse extends OkResponse> {
        constructor(public readonly data: TResponse | ErrResponse) {}
    }

    export class Ok<TResponse extends OkResponse> extends _Response<TResponse> {
        constructor(public readonly data: TResponse) {
            super(data);
        }

        readonly isOk = true;
        readonly isErr = false;
    }

    export class Err<
        TResponse extends OkResponse,
    > extends _Response<TResponse> {
        constructor(public readonly data: ErrResponse) {
            super(data);
        }

        readonly isOk = false;
        readonly isErr = true;
    }

    export type Response<TResponse extends OkResponse> =
        | Ok<TResponse>
        | Err<TResponse>;

    type RequestOptions = {
        opts?: RequestInit;
        querystring?: Record<string, string>;
        json?: any;
        ignore401?: boolean;
    };

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    async function fetchApi<TResponse extends OkResponse = void>(
        route: string,
        opts?: RequestOptions
    ): Promise<Response<TResponse>> {
        let fetchOpts: RequestInit = {
            credentials: "same-origin",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        // Forward cookies on serverside
        if (typeof document === "undefined") {
            const cookies: typeof import("next/headers").cookies =
                require("next/headers").cookies;
            (fetchOpts.headers as any)["Cookie"] = cookies().toString();
        }

        let searchParamsStr = "";
        if (opts !== undefined) {
            // Override fetch options
            if (opts.opts !== undefined)
                fetchOpts = { ...fetchOpts, ...opts.opts };

            // Override body with a json value
            if (opts.json !== undefined)
                fetchOpts.body = JSON.stringify(opts.json);

            // Build a query string
            if (opts.querystring !== undefined) {
                const searchParams = new URLSearchParams(opts.querystring);
                searchParamsStr = `?${searchParams}`;
            }
        }

        const resp = await fetch(
            API_BASE_URL + route + searchParamsStr,
            fetchOpts
        );

        let respData: any;
        try {
            respData = await resp.json();
        } catch (err) {
            respData = {};
        }

        if (resp.ok) return new Ok<TResponse>(respData);

        // Redirect to login page on 401
        const ignore401 = opts !== undefined ? opts.ignore401 : false;
        if (!ignore401 && respData?.statusCode === 401) redirect("/login");

        return new Err<TResponse>(respData);
    }

    export async function register(data: {
        name: string;
        surname: string;
        email: string;
        password: string;
    }) {
        return await fetchApi("/flow/register", {
            opts: { method: "POST" },
            json: data,
        });
    }

    export async function login(data: { email: string; password: string }) {
        return await fetchApi("/flow/login", {
            opts: { method: "POST" },
            json: data,
        });
    }

    export namespace Users {
        export type IPublicUser = {
            id: string;
            registeredAt: string;
            lastOnlineAt: string;
            name: string;
            surname: string;
        };

        export type IPrivateUser = {
            id: string;
            registeredAt: string;
            name: string;
            surname: string;
            email: string;
        };

        export type IFriendRequest = {
            id: string;
            user: IPublicUser;
        };

        export async function me() {
            return await fetchApi<IPrivateUser>("/users/me");
        }

        export async function getInfo(id: string) {
            return await fetchApi<IPublicUser>(`/users`, {
                querystring: { id },
            });
        }

        export async function meFriendList() {
            return await fetchApi<IFriendRequest[]>("/users/me/friendList");
        }
    }

    export namespace Chats {
        export type IMessage = {
            id: string;
            createdAt: string;
            author: Users.IPublicUser;
            content: string;
            acknowledged: boolean;
        };

        export type IChat = {
            id: string;
            createdAt: string;
            participants: Users.IPublicUser[];
            messages: IMessage[];
        };

        export async function getAll() {
            return await fetchApi<IChat[]>("/chats");
        }
    }
}
