import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Register() {
    const [errors, setErrors] = useState({});

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden bg-emerald-200 lg:block">
                <img
                    src="/images/home3.svg"
                    alt="Ims"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a
                        href="/"
                        className="flex items-center gap-2 font-medium text-emerald-800"
                    >
                        <img
                            src="/images/logo.svg"
                            alt="Ims"
                            className="h-12 w-12 rounded-full border-2 border-emerald-700"
                        />
                        ARMS
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-md">
                        <form className="flex flex-col gap-6">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Create a new account
                                </h1>
                                <p className="text-balance text-sm text-muted-foreground">
                                    Enter your email below to register your
                                    account
                                </p>
                            </div>

                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstname">
                                        First Name
                                    </Label>
                                    <Input id="firstname" type="text" />
                                    <InputError message={errors.firstname} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="middlename">
                                        Middle Name (Optional)
                                    </Label>
                                    <Input id="middlename" type="text" />
                                    <InputError message={errors.middlename} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastname">Last Name</Label>
                                    <Input id="lastname" type="text" />
                                    <InputError message={errors.lastname} />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-full grid gap-2">
                                        <Label htmlFor="institute">
                                            Institute
                                        </Label>
                                        <Select name="institute">
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">
                                                    Light
                                                </SelectItem>
                                                <SelectItem value="dark">
                                                    Dark
                                                </SelectItem>
                                                <SelectItem value="system">
                                                    System
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.institute}
                                        />
                                    </div>
                                    <div className="w-full grid gap-2">
                                        <Label htmlFor="organization">
                                            Organization
                                        </Label>
                                        <Select name="organization">
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">
                                                    Light
                                                </SelectItem>
                                                <SelectItem value="dark">
                                                    Dark
                                                </SelectItem>
                                                <SelectItem value="system">
                                                    System
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.organization}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-full grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input id="password" type="password" />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="w-full grid gap-2">
                                        <Label htmlFor="password_confirmation">
                                            Re-type Password
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password_confirmation"
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already registered?{" "}
                                <a
                                    href="/login"
                                    className="underline underline-offset-4"
                                >
                                    Log In
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
