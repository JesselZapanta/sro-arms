import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import { toast } from "sonner";
import TableData from "./TableData";

export default function Index() {
    const [data, setData] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const getdata = async () => {
        setLoading(true);
        const params = [
            `selectedYear=${selectedYear}`,
            `search=${search}`,
        ].join("&");
        try {
            const res = await axios.get(`/admin/receipt/getdata?${params}`);
            setData(res.data);
        } catch (err) {
            console.log(err);
            if (err && err.response.data.status === "user-notfound") {
                toast.error("The student not found.");
            }
            if (err && err.response.data.status === "ay-notfound") {
                toast.error("Please select an academic year.");
            }
        } finally {
            setLoading(false);
        }
    };

    const getyears = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/admin/receipt/getacedemicyears");
            setAcademicYears(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getyears();
    }, []);

    // console.log(academicYears);

    return (
        <AuthenticatedLayout>
            <Head title="Reciept Management" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="bg-gray-50 p-6 rounded-md">
                            <div className="mb-4">Reciept Management</div>
                            <div className="mb-4 flex gap-2">
                                <Select
                                    onValueChange={(value) =>
                                        setSelectedYear(value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Academic Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {academicYears.map((year) => (
                                            <SelectItem
                                                key={year.id}
                                                value={year.id}
                                            >
                                                {year.description}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    type="text"
                                    placeholder="Search ID, firstname or lastname"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button onClick={getdata}>
                                    <Search />
                                </Button>
                            </div>
                            <div className="">
                                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                                <TableData data={data} loading={loading} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="">semester</div>
            <div className="">name or id number</div>
            <div className="">table of Attendance</div>
            <div className="">print reciept</div> */}
        </AuthenticatedLayout>
    );
}
