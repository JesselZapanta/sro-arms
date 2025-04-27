import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/Components/ui/skeleton";
import { Check, OctagonAlert } from "lucide-react";
import Undefined from "../Event/Undefined";
import Absent from "../Event/Absent";
import Format from "../Event/Format";
import { Button } from "@/Components/ui/button";

export default function TableData({ data, loading }) {


    const formatAttendance = (eventType, isAM, timestamp, photo) => {
        console.log(photo);
        if ((eventType === "AM" && !isAM) || (eventType === "PM" && isAM)) {
            return <Undefined />;
        }
        return timestamp ? (
            <Format time={timestamp} image={photo} />
        ) : (
            <Absent />
        );

        
    };

    const columns = [
        { label: "AM Start", key: "am_start_photo_at", isAM: true },
        { label: "AM End", key: "am_end_photo_at", isAM: true },
        { label: "PM Start", key: "pm_start_photo_at", isAM: false },
        { label: "PM End", key: "pm_end_photo_at", isAM: false },
    ];

    return (
        <>
            <Table>
                <TableHeader className="bg-emerald-100">
                    <TableRow>
                        <TableHead>Event Name</TableHead>
                        {columns.map((col) => (
                            <TableHead key={col.key}>{col.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-11 w-full" />
                                    <Skeleton className="h-11 w-full" />
                                    <Skeleton className="h-11 w-full" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : data?.events?.length ? (
                        data.events.map((event) => {
                            const attendance = Object.values(
                                data.attendances || {}
                            ).find((att) => att.event.id === event.id);

                            return (
                                <TableRow key={event.id}>
                                    <TableCell>{event.name}</TableCell>
                                    {columns.map((col) => (
                                        <TableCell key={col.key}>
                                            {formatAttendance(
                                                event.type,
                                                col.isAM,
                                                attendance?.[col.key],
                                                attendance?.[
                                                    `${col.key.replace(
                                                        "_at",
                                                        ""
                                                    )}`
                                                ]
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="py-12 text-center text-muted-foreground italic"
                            >
                                No event and attendance found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="mt-4 bg-gray-100 p-4 rounded-md">
                <div className="flex justify-between">
                    <div className="text-md font-bold">
                        <p>Total Absent: {data.total_absent}</p>
                        <p>Total Sanction: {data.total_sanction}</p>
                    </div>
                    <div>
                        <Button>Print Reciept</Button>
                    </div>
                </div>
                <div className="w-[700px] h-[288px] bg-gray-200 rounded-md p-6">
                    <h2 className="text-center font-bold text-3xl tracking-[20px]">
                        RECEIPT
                    </h2>
                    <div className="flex justify-between">
                        <div className="w-52 h-12 flex items-end">
                            <div className="flex items-end gap-2 w-full">
                                <span className="mb-[-2px]">No.</span>
                                <div className="flex-1 border-b-2 border-black">
                                    <span className="ml-4 text-violet-800 text-xl tracking-[10px]">
                                        123456
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-52 h-12 flex items-end">
                            <div className="flex items-end gap-2 w-full">
                                <span className="mb-[-2px]">Date:</span>
                                <div className="flex-1 border-b-2 border-black">
                                    <span className="ml-4 text-xl">
                                        04-17-2025
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
                        <div className="flex items-end">
                            <div className="flex items-end gap-2 w-full">
                                <span className="mb-[-2px] pl-24">
                                    Recieved from
                                </span>
                                <div className="flex-1 border-b-2 border-black">
                                    <span className="ml-4 text-xl tracking-[5px]">
                                        <span>{data?.user.firstname}</span>
                                        <span className="ml-2">
                                            {data?.user.lastname}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <div className="flex items-end gap-2 w-full">
                                <span className="mb-[-2px]">
                                    The sum of pesos
                                </span>
                                <div className="flex-1 border-b-2 border-black">
                                    <span className="ml-4 text-xl tracking-[5px]">
                                        one hundred pesos only
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <div className="flex items-end gap-2 w-full">
                                <span className="mb-[-2px]">as payment</span>
                                <div className="flex-1 border-b-2 border-black">
                                    <span className="ml-4 text-xl tracking-[5px]">
                                        Sanction for Event Attendance Only
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-52 h-12 flex items-end">
                            <div className="flex items-end gap-2 w-full">
                                <span className="mb-[-2px] text-3xl uppercase font-black">
                                    P
                                </span>
                                <div className="flex-1 border-b-2 border-black">
                                    <span className="ml-4 text-xl tracking-[5px]">
                                        {data.total_sanction + ".00"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-52 h-12 flex items-end">
                            <div className="flex items-end gap-2 w-full">
                                <span className="mb-[-2px]">Signature:</span>
                                <div className="flex-1 border-b-2 border-black">
                                    <span className="ml-4 text-xl"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
