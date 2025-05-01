import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from 'react';
import axios from 'axios';

// Example dummy data
// const attendanceData = [
//     { name: "Orientation", attendees: 120 },
//     { name: "Sportsfest", attendees: 300 },
//     { name: "Seminar", attendees: 180 },
//     { name: "Hackathon", attendees: 95 },
//     { name: "Closing Ceremony", attendees: 250 },
// ];

export default function Dashboard() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getdata = async () => {
        setLoading(true);
        try{
            const res = await axios.get('/student/dashboard/getdata')

            setData(res.data)

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Summary Cards */}
                            {/* <Card>
                                <CardHeader>
                                    <CardTitle>Total Students</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        {data.totalUsers}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Across all Institute
                                    </p>
                                </CardContent>
                            </Card> */}

                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Events</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-green-600">
                                        {data}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Updated at{" "}
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* <Card>
                                <CardHeader>
                                    <CardTitle>Total Attendees</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-indigo-600">
                                        {data.totalAttendance}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Updated at{" "}
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card> */}
                            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                            {/* Line Chart - Daily Attendance Trend */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

