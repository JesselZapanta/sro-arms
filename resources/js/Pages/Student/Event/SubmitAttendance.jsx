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

import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Badge } from "@/Components/ui/badge";

export default function SubmitAttendance({ id }) {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});
    const [attendance, setAttendance] = useState({});

    const getEvent = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/student/submit-attendance/getdata/${id}`
            );
            if (res.status === 200) {
                setEvent(res.data.event);
                setAttendance(res.data.attendance);
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
        getEvent();
    };

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

    const [activeTab, setActiveTab] = useState("am_start_photo");

    function formatTime(datetimeString) {
        const date = new Date(datetimeString);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }
    
    const eventDate = new Date(event?.event_date).toLocaleDateString();
    const today = new Date().toLocaleDateString();

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
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>
                                                Show Attendance Details
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <pre>
                                                    {JSON.stringify(
                                                        attendance,
                                                        null,
                                                        2
                                                    )}
                                                </pre>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    {eventDate === today ? (
                                        <div className="mt-8">
                                            <h2>
                                                Please upload your attendance
                                                here
                                            </h2>
                                            <div className="bg-gray-100 mt-4 p-2 rounded-md">
                                                <Tabs
                                                    onValueChange={setActiveTab}
                                                    defaultValue="am_start_photo"
                                                    className="w-full"
                                                >
                                                    <TabsList>
                                                        {(event.type === "AM" ||
                                                            event.type ===
                                                                "WD") && (
                                                            <>
                                                                <TabsTrigger value="am_start_photo">
                                                                    Morning In
                                                                </TabsTrigger>
                                                                <TabsTrigger value="am_end_photo">
                                                                    Morning Out
                                                                </TabsTrigger>
                                                            </>
                                                        )}
                                                        {(event.type === "PM" ||
                                                            event.type ===
                                                                "WD") && (
                                                            <>
                                                                <TabsTrigger value="pm_start_photo">
                                                                    Afternoon In
                                                                </TabsTrigger>
                                                                <TabsTrigger value="pm_end_photo">
                                                                    Afternoon
                                                                    Out
                                                                </TabsTrigger>
                                                            </>
                                                        )}
                                                    </TabsList>
                                                    <div className="p-2">
                                                        <form
                                                            onSubmit={
                                                                handleSubmit
                                                            }
                                                        >
                                                            <TabsContent value="am_start_photo">
                                                                <div className="max-w-60">
                                                                    {attendance?.am_start_photo ? (
                                                                        <div>
                                                                            <h2>
                                                                                Attendance
                                                                                Uploaded
                                                                            </h2>
                                                                            <div className="w-full h-full my-2 overflow-hidden">
                                                                                <img
                                                                                    src={`/storage/${attendance.am_start_photo}`}
                                                                                    className="w-full h-60 rounded-xl object-cover"
                                                                                />
                                                                            </div>
                                                                            <p>
                                                                                Uploaded
                                                                                at:{" "}
                                                                                <Badge>
                                                                                    {formatTime(
                                                                                        attendance.am_start_photo_at
                                                                                    )}
                                                                                </Badge>
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <Label htmlFor="am_start_photo">
                                                                                Morning
                                                                                In
                                                                                Attendance
                                                                            </Label>
                                                                            <Input
                                                                                name="am_start_photo"
                                                                                type="file"
                                                                                className="mt-1 block w-full"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setFormData(
                                                                                        {
                                                                                            ...formData,
                                                                                            am_start_photo:
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
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="am_end_photo">
                                                                <div className="max-w-60">
                                                                    {attendance?.am_end_photo ? (
                                                                        <div>
                                                                            <h2>
                                                                                Attendance
                                                                                Uploaded
                                                                            </h2>
                                                                            <div className="w-full h-full my-2 overflow-hidden">
                                                                                <img
                                                                                    src={`/storage/${attendance.am_end_photo}`}
                                                                                    className="w-full h-60 rounded-xl object-cover"
                                                                                />
                                                                            </div>
                                                                            <p>
                                                                                Uploaded
                                                                                at:{" "}
                                                                                <Badge>
                                                                                    {formatTime(
                                                                                        attendance.am_end_photo_at
                                                                                    )}
                                                                                </Badge>
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <Label htmlFor="am_end_photo">
                                                                                Morning
                                                                                Out
                                                                                Attendance
                                                                            </Label>
                                                                            <Input
                                                                                name="am_end_photo"
                                                                                type="file"
                                                                                className="mt-1 block w-full"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setFormData(
                                                                                        {
                                                                                            ...formData,
                                                                                            am_end_photo:
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
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="pm_start_photo">
                                                                <div className="max-w-60">
                                                                    {attendance?.pm_start_photo ? (
                                                                        <div>
                                                                            <h2>
                                                                                Attendance
                                                                                Uploaded
                                                                            </h2>
                                                                            <div className="w-full h-full my-2 overflow-hidden">
                                                                                <img
                                                                                    src={`/storage/${attendance.pm_start_photo}`}
                                                                                    className="w-full h-60 rounded-xl object-cover"
                                                                                />
                                                                            </div>
                                                                            <p>
                                                                                Uploaded
                                                                                at:{" "}
                                                                                <Badge>
                                                                                    {formatTime(
                                                                                        attendance.pm_start_photo_at
                                                                                    )}
                                                                                </Badge>
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <Label htmlFor="pm_start_photo">
                                                                                Afternoon
                                                                                In
                                                                                Attendance
                                                                            </Label>
                                                                            <Input
                                                                                name="pm_start_photo"
                                                                                type="file"
                                                                                className="mt-1 block w-full"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setFormData(
                                                                                        {
                                                                                            ...formData,
                                                                                            pm_start_photo:
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
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </TabsContent>
                                                            <TabsContent value="pm_end_photo">
                                                                <div className="max-w-60">
                                                                    {attendance?.pm_end_photo ? (
                                                                        <div>
                                                                            <h2>
                                                                                Attendance
                                                                                Uploaded
                                                                            </h2>
                                                                            <div className="w-full h-full my-2 overflow-hidden">
                                                                                <img
                                                                                    src={`/storage/${attendance.pm_end_photo}`}
                                                                                    className="w-full h-60 rounded-xl object-cover"
                                                                                />
                                                                            </div>
                                                                            <p>
                                                                                Uploaded
                                                                                at:{" "}
                                                                                <Badge>
                                                                                    {formatTime(
                                                                                        attendance.pm_end_photo_at
                                                                                    )}
                                                                                </Badge>
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        <>
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
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </TabsContent>
                                                            <div className="mt-4">
                                                                {((activeTab ===
                                                                    "am_start_photo" &&
                                                                    !attendance?.am_start_photo) ||
                                                                    (activeTab ===
                                                                        "am_end_photo" &&
                                                                        !attendance?.am_end_photo) ||
                                                                    (activeTab ===
                                                                        "pm_start_photo" &&
                                                                        !attendance?.pm_start_photo) ||
                                                                    (activeTab ===
                                                                        "pm_end_photo" &&
                                                                        !attendance?.pm_end_photo)) && (
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
                                                                )}
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Tabs>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                        <div className="w-full mt-8 text-center">
                                            No attendance 
                                        </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
