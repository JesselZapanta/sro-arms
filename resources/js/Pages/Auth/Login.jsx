import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { router } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Login() {

    const [formData, setFormData] = useState({
            studentId: "",
            password: "",
        });
        const [errors, setErrors] = useState({});
        const [processing, setProcessing] = useState(false);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            setProcessing(true);
    
            try {
                const res = await axios.post("/login", formData);
                if (res.data.status === "login") {
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
                <div className="flex justify-center gap-2 md:justify-start ">
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
                    <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-md">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Login to your account
                                </h1>
                                <p className="text-balance text-sm text-muted-foreground">
                                    Enter your student ID below to login to your
                                    account
                                </p>
                            </div>
                            <div className="grid gap-6">
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
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        {/* <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a> */}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            });
                                        }}
                                    />
                                    <InputError message={errors.password} />
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
                                        "Log In"
                                    )}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a
                                    href="/register"
                                    className="underline underline-offset-4"
                                >
                                    Sign up
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
