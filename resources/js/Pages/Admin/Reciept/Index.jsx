import { Button } from "@/Components/ui/button";
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

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { toast } from "sonner";
import TableData from "./TableData";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";

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
                setData([]);
                toast.error("The student not found.");
            }
            if (err && err.response.data.status === "ay-notfound") {
                setData([]);
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
                            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                            {data?.user && (
                                <div className="p-4 my-4 bg-gray-100 rounded-md">
                                    <div>
                                        Student Id:{" "}
                                        <span>{data?.user.studentId}</span>
                                    </div>
                                    <div>
                                        Student Name:{" "}
                                        <span>{data?.user.firstname}</span>
                                        <span  className="ml-2">{data?.user.lastname}</span>
                                    </div>
                                    <div>
                                        Institute:{" "}
                                        <span>{data?.user.institute}</span>
                                    </div>
                                    <div>
                                        Organization:{" "}
                                        <span>{data?.user.organization}</span>
                                    </div>
                                </div>
                            )}
                            {data?.events && (
                                <TableData data={data} loading={loading} />
                            )}
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
