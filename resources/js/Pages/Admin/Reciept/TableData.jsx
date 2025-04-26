import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/Components/ui/skeleton";

export default function TableData({data, loading}) {
    function formatDateTime(datetime) {
        const options = { dateStyle: "medium", timeStyle: "short" };
        return new Date(datetime).toLocaleString(undefined, options);
    }

    function EmptyCell() {
        return <span className="text-muted-foreground italic">No Record</span>;
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event Name</TableHead>
                        <TableHead>AM Start</TableHead>
                        <TableHead>AM End</TableHead>
                        <TableHead>PM Start</TableHead>
                        <TableHead>PM End</TableHead>
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

                            // AM Start
                            const amStart =
                                event.type === "PM"
                                    ? "No Attendance"
                                    : attendance?.am_start_photo_at
                                    ? formatDateTime(
                                          attendance.am_start_photo_at
                                      )
                                    : "Absent";

                            // AM End
                            const amEnd =
                                event.type === "PM"
                                    ? "No Attendance"
                                    : attendance?.am_end_photo_at
                                    ? formatDateTime(attendance.am_end_photo_at)
                                    : "Absent";

                            // PM Start
                            const pmStart =
                                event.type === "AM"
                                    ? "No Attendance"
                                    : attendance?.pm_start_photo_at
                                    ? formatDateTime(
                                          attendance.pm_start_photo_at
                                      )
                                    : "Absent";

                            // PM End
                            const pmEnd =
                                event.type === "AM"
                                    ? "No Attendance"
                                    : attendance?.pm_end_photo_at
                                    ? formatDateTime(attendance.pm_end_photo_at)
                                    : "Absent";

                            return (
                                <TableRow key={event.id}>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{amStart}</TableCell>
                                    <TableCell>{amEnd}</TableCell>
                                    <TableCell>{pmStart}</TableCell>
                                    <TableCell>{pmEnd}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="py-12 text-center"
                            >
                                No attendance found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div>Total Absent: {data.total_absent}</div>
            <div>Total Sanction: {data.total_sanction}</div>
        </>
    );
}
