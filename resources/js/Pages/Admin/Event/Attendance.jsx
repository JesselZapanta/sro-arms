import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Skeleton } from "@/Components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { Check, ChevronLeft, ChevronRight, OctagonAlert, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Format from "./Format";
import Absent from "./Absent";
import Undefined from "./Undefined";
import ExportExcel from "./ExportExcel";

export default function Attendance({ id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    const getdata = async () => {
        setLoading(true);

        const params = [
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
        ].join("&");

        try {
            const res = await axios.get(
                `/admin/attendance/getdata/${id}?${params}`
            );

            setData(res.data.data);
            setPage(res.data.current_page);
            setLastPage(res.data.last_page);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getdata();
    }, [page, sortField, sortOrder]);

    function timeformat(datetime) {
        return datetime ? datetime.slice(11, 16) : "Absent";
    }

    function iconformat(time, image){
        return time ? <Format time={time} image={image} /> : <Absent />;
    } 

    return (
        <AuthenticatedLayout>
            <Head title="List of Attendance" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="bg-gray-50 p-6 rounded-md">
                            <div className="mb-4">List of Attendance</div>
                            <div className="mb-4 flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search first name, last name or student Id"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button onClick={getdata}>
                                    <Search />
                                </Button>
                                <ExportExcel data={data} fileName="event_attendance"/>
                            </div>

                            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

                            <Table>
                                <TableHeader className="bg-emerald-100">
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Firstname</TableHead>
                                        <TableHead>Lastname</TableHead>
                                        <TableHead>AM IN</TableHead>
                                        <TableHead>AM OUT</TableHead>
                                        <TableHead>PM IN</TableHead>
                                        <TableHead>PM OUT</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center"
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <Skeleton className="h-11 w-full" />
                                                    <Skeleton className="h-11 w-full" />
                                                    <Skeleton className="h-11 w-full" />
                                                    <Skeleton className="h-11 w-full" />
                                                    <Skeleton className="h-11 w-full" />
                                                    <Skeleton className="h-11 w-full" />
                                                    <Skeleton className="h-11 w-full" />
                                                    <Skeleton className="h-11 w-full" />
                                                    <Skeleton className="h-11 w-full" />
                                                    <Skeleton className="h-11 w-full" />
                                                </div>
                                                {/* <Loader2 className="animate-spin" /> */}
                                            </TableCell>
                                        </TableRow>
                                    ) : data.length > 0 ? (
                                        data.map((attendance) => (
                                            <TableRow key={attendance.id}>
                                                <TableCell>
                                                    {attendance?.user.studentId}
                                                </TableCell>
                                                <TableCell>
                                                    {attendance?.user.firstname}
                                                </TableCell>
                                                <TableCell>
                                                    {attendance?.user.lastname}
                                                </TableCell>
                                                <TableCell>
                                                    {attendance?.event.type ===
                                                        "AM" ||
                                                    attendance?.event.type ===
                                                        "WD" ? (
                                                        iconformat(
                                                            attendance?.am_start_photo_at,
                                                            attendance?.am_start_photo
                                                        )
                                                    ) : (
                                                        <Undefined />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {attendance?.event.type ===
                                                        "AM" ||
                                                    attendance?.event.type ===
                                                        "WD" ? (
                                                        iconformat(
                                                            attendance?.am_end_photo_at,
                                                            attendance?.am_end_photo
                                                        )
                                                    ) : (
                                                        <Undefined />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {attendance?.event.type ===
                                                        "PM" ||
                                                    attendance?.event.type ===
                                                        "WD" ? (
                                                        iconformat(
                                                            attendance?.pm_start_photo_at,
                                                            attendance?.pm_start_photo
                                                        )
                                                    ) : (
                                                        <Undefined />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {attendance?.event.type ===
                                                        "PM" ||
                                                    attendance?.event.type ===
                                                        "WD" ? (
                                                        iconformat(
                                                            attendance?.pm_end_photo_at,
                                                            attendance?.pm_end_photo
                                                        )
                                                    ) : (
                                                        <Undefined />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center"
                                            >
                                                No attendance found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {/* Pagination Controls */}
                            <div className="flex justify-end gap-4 items-center mt-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setPage((prev) => Math.max(prev - 1, 1))
                                    }
                                    disabled={page === 1}
                                >
                                    <ChevronLeft />
                                </Button>

                                <span>
                                    Page {page} of {lastpage}
                                </span>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setPage((prev) =>
                                            Math.min(prev + 1, lastpage)
                                        )
                                    }
                                    disabled={page === lastpage}
                                >
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
