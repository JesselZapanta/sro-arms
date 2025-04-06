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
import { router } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        institute: "",
        organization: "",
        studentId: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const res = await axios.post("/register", formData);
            if (res.data.status === "registered") {
                router.visit("/login"); //change to dashboard controller
            }
        } catch (err) {
            setErrors(err.response.data.errors);
        } finally {
            setProcessing(false);
        }
    };

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
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
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
                                    <Input
                                        id="firstname"
                                        type="text"
                                        value={formData.firstname}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                firstname: e.target.value,
                                            });
                                        }}
                                    />
                                    <InputError message={errors.firstname} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="middlename">
                                        Middle Name (Optional)
                                    </Label>
                                    <Input
                                        id="middlename"
                                        type="text"
                                        value={formData.middlename}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                middlename: e.target.value,
                                            });
                                        }}
                                    />
                                    <InputError message={errors.middlename} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastname">Last Name</Label>
                                    <Input
                                        id="lastname"
                                        type="text"
                                        value={formData.lastname}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                lastname: e.target.value,
                                            });
                                        }}
                                    />
                                    <InputError message={errors.lastname} />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-full grid gap-2">
                                        <div>
                                            <Label htmlFor="institute">
                                                Institute
                                            </Label>
                                            <Select
                                                name="institute"
                                                onValueChange={(value) =>
                                                    setFormData({
                                                        ...formData,
                                                        institute:
                                                            String(value),
                                                    })
                                                }
                                                value={String(
                                                    formData.institute
                                                )}
                                            >
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
                                        </div>
                                        <InputError
                                            message={errors.institute}
                                        />
                                    </div>
                                    <div className="w-full grid gap-2">
                                        <div>
                                            <Label htmlFor="organization">
                                                Organization
                                            </Label>
                                            <Select
                                                name="organization"
                                                onValueChange={(value) =>
                                                    setFormData({
                                                        ...formData,
                                                        organization:
                                                            String(value),
                                                    })
                                                }
                                                value={String(
                                                    formData.organization
                                                )}
                                            >
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
                                        </div>
                                        <InputError
                                            message={errors.organization}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="studentId">
                                        Student ID
                                    </Label>
                                    <Input
                                        id="studentId"
                                        type="number"
                                        value={formData.studentId}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                studentId: e.target.value,
                                            });
                                        }}
                                    />
                                    <InputError message={errors.studentId} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            });
                                        }}
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-full grid gap-2">
                                        <div>
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        password:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="w-full grid gap-2">
                                        <div>
                                            <Label htmlFor="password_confirmation">
                                                Re-type Password
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password_confirmation"
                                                value={
                                                    formData.password_confirmation
                                                }
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        password_confirmation:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="animate-spin" />
                                            Please wait
                                        </span>
                                    ) : (
                                        "Register"
                                    )}
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
