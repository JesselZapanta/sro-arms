import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
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
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

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
                                <Button>Export</Button>
                            </div>

                            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

                            <Table>
                                <TableHeader className="bg-emerald-100">
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>FirstName</TableHead>
                                        <TableHead>Lastname</TableHead>
                                        <TableHead>AM IN</TableHead>
                                        <TableHead>AM OUT</TableHead>
                                        <TableHead>PM IN</TableHead>
                                        <TableHead>PM OUT</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <div>Data is loading</div>
                                    ) : data.length > 0 ? (
                                        data.map((attendance) => (
                                            <TableRow>
                                                <TableCell>{attendance.user.studentId}</TableCell>
                                                <TableCell>{attendance.user.firstname}</TableCell>
                                                <TableCell>{attendance.user.lastname}</TableCell>
                                                <TableCell>{attendance.am_start_photo_at}</TableCell>
                                                <TableCell>{attendance.am_end_photo_at}</TableCell>
                                                <TableCell>{attendance.pm_start_photo}</TableCell>
                                                <TableCell>{attendance.pm_end_photo}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <div>No data is found</div>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
