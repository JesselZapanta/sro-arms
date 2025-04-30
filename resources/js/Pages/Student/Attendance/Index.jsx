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
// import TableData from "./TableData";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import TableData from "./TableData";


export default function Index() {
    const [data, setData] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    const [loading, setLoading] = useState(false);

    const [receipt, setReceipt] = useState();

    const getdata = async () => {
        setLoading(true);
        setReceipt();

        const params = [
            `selectedYear=${selectedYear}`,
        ].join("&");

        try {
            const res = await axios.get(`/student/attendance/getdata?${params}`);
            setData(res.data);
        } catch (err) {

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
            const res = await axios.get("/student/attendance/getacedemicyears");
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
                                <Button onClick={getdata}>
                                    <Search />
                                </Button>
                            </div>
                            {data?.events && (
                                <TableData
                                    data={data}
                                    loading={loading}
                                />
                                // <pre>{JSON.stringify(data, null, 2)}</pre>
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
