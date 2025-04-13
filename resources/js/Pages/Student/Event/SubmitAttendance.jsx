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

import { Separator } from "@/components/ui/separator";

import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";


export default function SubmitAttendance({id}) {

    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});

    const getEvent = async () => {
        setLoading(true)
        try{
            const res = await axios.get(
                `/student/submit-attendance/getevent/${id}`
            );
            if(res.status === 200){
                setEvent(res.data);
            }
        }catch(err){
            console.error(err);
        }finally{
        setLoading(false);
        }
    } 

    useEffect(() => {
        getEvent();
    }, [])

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
                                        <h2>Submit your attendance here</h2>
                                        <div className="bg-gray-100 mt-4 p-2 rounded-md">
                                            <Tabs
                                                defaultValue="morning_in"
                                                className="w-full"
                                            >
                                                <TabsList>
                                                    <TabsTrigger value="morning_in">
                                                        Morning In
                                                    </TabsTrigger>
                                                    <TabsTrigger value="morning_out">
                                                        Morning Out
                                                    </TabsTrigger>
                                                    <TabsTrigger value="afternoon_in">
                                                        Afternoon In
                                                    </TabsTrigger>
                                                    <TabsTrigger value="afternoon_out">
                                                        Afternoon Out
                                                    </TabsTrigger>
                                                </TabsList>
                                                <div className="p-2">
                                                    <TabsContent value="morning_in">
                                                        Moring in attendance
                                                    </TabsContent>
                                                    <TabsContent value="morning_out">
                                                        Moring out attendance
                                                    </TabsContent>
                                                    <TabsContent value="afternoon_in">
                                                        Afternoon in attendance
                                                    </TabsContent>
                                                    <TabsContent value="afternoon_out">
                                                        Afternoon out attendance
                                                    </TabsContent>
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
