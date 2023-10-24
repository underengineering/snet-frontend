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
            avatar?: string;
            name: string;
            surname: string;
        };

        export type IPrivateUser = {
            id: string;
            registeredAt: string;
            name: string;
            surname: string;
            email: string;
            avatar?: string;
        };

        export async function me() {
            return await fetchApi<IPrivateUser>("/users/me");
        }

        export async function edit(data: {
            name?: string;
            surname?: string;
            avatar?: string;
        }) {
            return await fetchApi<IPrivateUser>("/users/me", {
                opts: { method: "PATCH" },
                json: data,
            });
        }

        export async function search(
            query: string,
            skip?: number,
            limit?: number
        ) {
            return await fetchApi<IPublicUser[]>("/users/search", {
                querystring: {
                    query,
                    skip: `${skip ?? 0}`,
                    limit: `${limit ?? 30}`,
                },
            });
        }

        export async function getInfo(id: string) {
            return await fetchApi<IPublicUser>("/users", {
                querystring: { id },
            });
        }
    }

    export namespace Friends {
        export type IFriendRequest = {
            id: string;
            user: Users.IPublicUser;
        };

        export type IReceivedFriendRequest = {
            id: string;
            sender: Users.IPublicUser;
            sentAt: string;
        };

        export type ISentFriendRequest = {
            id: string;
            receiver: Users.IPublicUser;
            sentAt: string;
        };

        export async function sendRequest(id: string) {
            return await fetchApi<IFriendRequest>("/friends/me", {
                opts: { method: "POST" },
                json: { id },
            });
        }

        export async function getAll() {
            return await fetchApi<IFriendRequest[]>("/friends/me");
        }

        export async function getRequests() {
            return await fetchApi<{
                received: IReceivedFriendRequest[];
                sent: ISentFriendRequest[];
            }>("/friends/me/requests");
        }

        export async function acceptRequest(id: string) {
            return await fetchApi("/friends/me/requests", {
                opts: { method: "POST" },
                json: { id },
            });
        }

        export async function rejectRequest(id: string) {
            return await fetchApi("/friends/me/requests", {
                opts: { method: "DELETE" },
                json: { id },
            });
        }
    }

    export namespace DM {
        export type IMessage = {
            id: string;
            createdAt: string;
            author: Users.IPublicUser;
            content: string;
            acknowledged: boolean;
        };

        export type IDM = {
            id: string;
            createdAt: string;
            participant: Users.IPublicUser;
            messages: IMessage[];
        };

        export async function getAll() {
            return await fetchApi<IDM[]>("/dms");
        }

        export async function paginate(
            id: string,
            beforeId?: number,
            limit?: number
        ) {
            let querystring: Record<string, string> = { id };
            if (beforeId !== undefined)
                querystring.beforeId = beforeId.toFixed(0);

            if (limit !== undefined) querystring.limit = limit.toFixed(0);

            return await fetchApi<IMessage[]>("/dms/messages", {
                querystring,
            });
        }

        export async function create(participant: string) {
            return await fetchApi<IDM>("/dms", {
                opts: { method: "POST" },
                json: { participant },
            });
        }

        export async function createMessage(id: string, content: string) {
            return await fetchApi("/dms/messages", {
                opts: { method: "PUT" },
                json: { id, content },
            });
        }
    }

    export namespace File {
        export async function upload(file: File) {
            const formData = new FormData();
            formData.append("file", file);

            return await fetchApi<{ hash: string }>("/files", {
                opts: {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                },
            });
        }
    }
}
