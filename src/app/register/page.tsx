"use client";

import { FormEvent, useState } from "react";
import { Api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Register() {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const router = useRouter();
    async function onSubmit(event: FormEvent) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries()) as Parameters<typeof Api.register>[0];
        const resp = await Api.register(data);
        if (resp.isErr()) {
            setErrorMessage(resp.data.message);
        } else {
            router.push("/login");
        }
    }

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col w-full max-w-7xl justify-center">
                <span className="self-center font-bold text-xl">Register</span>
                <form className="p-2 flex flex-col gap-4 rounded-md shadow-md bg-secondary-bg" method="post" onSubmit={onSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input
                            className="p-1 rounded-md outline outline-1 outline-neutral focus:outline-primary invalid:outline-primary-red transition-colors"
                            type="text"
                            name="name"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="surname">Surname</label>
                        <input
                            className="p-1 rounded-md outline outline-1 outline-neutral focus:outline-primary invalid:outline-primary-red transition-colors"
                            type="text"
                            name="surname"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            className="p-1 rounded-md outline outline-1 outline-neutral focus:outline-primary invalid:outline-primary-red transition-colors"
                            type="email"
                            name="email"
                        />
                        {errorMessage !== undefined ? <span className="text-primary-red">{errorMessage}</span> : <></>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            className="p-1 rounded-md outline outline-1 outline-neutral focus:outline-primary transition-colors"
                            type="password"
                            name="password"
                        />
                    </div>
                    <button className="p-1 rounded-md text-white bg-btn hover:bg-btn-hover active:bg-btn-active transition-colors" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
