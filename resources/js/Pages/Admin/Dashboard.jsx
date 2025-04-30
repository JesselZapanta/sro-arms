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

// Example dummy data
const dailyAttendanceData = [
    { date: "Apr 1", present: 95 },
    { date: "Apr 2", present: 98 },
    { date: "Apr 3", present: 92 },
    { date: "Apr 4", present: 96 },
    { date: "Apr 5", present: 99 },
    ]

    const weeklyAttendanceData = [
    { week: "Week 1", present: 480, absent: 20 },
    { week: "Week 2", present: 470, absent: 30 },
    { week: "Week 3", present: 460, absent: 40 },
    { week: "Week 4", present: 490, absent: 10 },
]


export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Summary Cards */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Students</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        500
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Across all sections
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Present Today</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-green-600">
                                        485
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Updated at 10:00 AM
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Absent Today</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-red-600">
                                        15
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Excused and unexcused
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Line Chart - Daily Attendance Trend */}
                            <Card className="col-span-1 md:col-span-3">
                                <CardHeader>
                                    <CardTitle>
                                        Daily Attendance Trend
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="h-72">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart data={dailyAttendanceData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line
                                                type="monotone"
                                                dataKey="present"
                                                stroke="#3b82f6"
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Bar Chart - Weekly Attendance Summary */}
                            {/* <Card className="col-span-1 md:col-span-2">
                                <CardHeader>
                                    <CardTitle>
                                        Weekly Attendance Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="h-72">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart data={weeklyAttendanceData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="week" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar
                                                dataKey="present"
                                                fill="#10b981"
                                                name="Present"
                                            />
                                            <Bar
                                                dataKey="absent"
                                                fill="#ef4444"
                                                name="Absent"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

