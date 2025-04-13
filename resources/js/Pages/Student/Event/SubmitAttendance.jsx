import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SubmitAttendance({ id }) {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});

    const getEvent = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/student/submit-attendance/getevent/${id}`
            );
            if (res.status === 200) {
                setEvent(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEvent();
    }, []);

    const [formData, setFormData] = useState({
        am_start_photo: null,
        am_end_photo: null,
        pm_start_photo: null,
        am_end_photo: null,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const formCancel = () => {
        setFormData({
            am_start_photo: null,
            am_end_photo: null,
            pm_start_photo: null,
            am_end_photo: null,
        });
        setErrors({});  
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const res = await axios.post(
                `/student/submit-attendance/upload/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.status === "uploaded") {
                formCancel();
                toast.success("The attendance is uploaded successfully.");
            }

            if (res.data.status === "updated") {
                formCancel();
                toast.success("The new attendance uploaded successfully.");
            }
        } catch (err) {
            setErrors(err.response.data.errors);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Submit Attendance
                </h2>
            }
        >
            <Head title="Submit Attendance" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="bg-gray-50 p-6 rounded-md">
                            {loading ? (
                                <div>Loading</div>
                            ) : (
                                // <pre>{JSON.stringify(event, null, 2)}</pre>
                                <>
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                Show Event Details
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <pre>
                                                    {JSON.stringify(
                                                        event,
                                                        null,
                                                        2
                                                    )}
                                                </pre>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <div className="mt-8">
                                        <h2>
                                            Please upload your attendance here
                                        </h2>
                                        <div className="bg-gray-100 mt-4 p-2 rounded-md">
                                            <Tabs
                                                defaultValue="am_start_photo
"
                                                className="w-full"
                                            >
                                                <TabsList>
                                                    <TabsTrigger value="am_start_photo
">
                                                        Morning In
                                                    </TabsTrigger>
                                                    <TabsTrigger value="am_end_photo
">
                                                        Morning Out
                                                    </TabsTrigger>
                                                    <TabsTrigger value="pm_start_photo
">
                                                        Afternoon In
                                                    </TabsTrigger>
                                                    <TabsTrigger value="pm_end_photo">
                                                        Afternoon Out
                                                    </TabsTrigger>
                                                </TabsList>
                                                <div className="p-2">
                                                    <form
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <TabsContent value="am_start_photo
">
                                                            <div className="max-w-60">
                                                                <Label htmlFor="am_start_photo
">
                                                                    Morning In
                                                                    Attendance
                                                                </Label>
                                                                <Input
                                                                    name="am_start_photo
"
                                                                    type="file"
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFormData(
                                                                            {
                                                                                ...formData,
                                                                                am_start_photo
:
                                                                                    e
                                                                                        .target
                                                                                        .files[0],
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.am_start_photo

                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </TabsContent>
                                                        <TabsContent value="am_end_photo
">
                                                            <div className="max-w-60">
                                                                <Label htmlFor="am_end_photo
">
                                                                    Morning Out
                                                                    Attendance
                                                                </Label>
                                                                <Input
                                                                    name="am_end_photo
"
                                                                    type="file"
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFormData(
                                                                            {
                                                                                ...formData,
                                                                                am_end_photo
:
                                                                                    e
                                                                                        .target
                                                                                        .files[0],
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.am_end_photo

                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </TabsContent>
                                                        <TabsContent value="pm_start_photo
">
                                                            <div className="max-w-60">
                                                                <Label htmlFor="pm_start_photo
">
                                                                    Afternoon In
                                                                    Attendance
                                                                </Label>
                                                                <Input
                                                                    name="pm_start_photo
"
                                                                    type="file"
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFormData(
                                                                            {
                                                                                ...formData,
                                                                                pm_start_photo
:
                                                                                    e
                                                                                        .target
                                                                                        .files[0],
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.pm_start_photo

                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </TabsContent>
                                                        <TabsContent value="pm_end_photo">
                                                            <div className="max-w-60">
                                                                <Label htmlFor="pm_end_photo">
                                                                    Afternoon
                                                                    Out
                                                                    Attendance
                                                                </Label>
                                                                <Input
                                                                    name="pm_end_photo"
                                                                    type="file"
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFormData(
                                                                            {
                                                                                ...formData,
                                                                                pm_end_photo:
                                                                                    e
                                                                                        .target
                                                                                        .files[0],
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.pm_end_photo
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </TabsContent>
                                                        <div className="mt-4">
                                                            <Button
                                                                type="submit"
                                                                disabled={
                                                                    processing
                                                                }
                                                            >
                                                                {processing ? (
                                                                    <span className="flex items-center gap-2">
                                                                        <Loader2 className="animate-spin" />
                                                                        Please
                                                                        wait
                                                                    </span>
                                                                ) : (
                                                                    "Submit"
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Tabs>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
