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

import { numberToWords } from "amount-to-words";
import Reciept from "./Reciept";

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
            <Reciept data={data} />
        </>
    );
}
