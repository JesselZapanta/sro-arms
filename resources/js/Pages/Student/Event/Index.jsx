import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { Button } from "@/Components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Skeleton } from "@/Components/ui/skeleton";
import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";

export default function Index({ academicYears }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [year, setYear] = useState(() => 
        academicYears.length > 0 ? String(academicYears[0].id) : ""
    );


    const [search, setSearch] = useState("");

    //fetching data = events
    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
            `year=${year}`,
        ].join("&");

        try {
            const res = await axios.get(`/student/event/getdata?${params}`);

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
    }, [page, sortField, sortOrder, year]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Event
                </h2>
            }
        >
            <Head title="Event" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="bg-gray-50 p-6 rounded-md">
                            <div className="mb-4">List of events</div>
                            <div className="mb-4 flex gap-2">
                                <div className="w-1/3">
                                    <Select
                                        value={year}
                                        onValueChange={(value) =>
                                            setYear(value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {academicYears.map((year) => (
                                                <SelectItem
                                                    key={year.id}
                                                    value={String(year.id)}
                                                >
                                                    {year.description}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Search event"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button onClick={getdata}>
                                    <Search />
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {loading ? (
                                    <>
                                        <Skeleton className="h-96 w-full rounded-lg" />
                                        <Skeleton className="h-96 w-full rounded-lg" />
                                        <Skeleton className="h-96 w-full rounded-lg" />
                                    </>
                                ) : data.length > 0 ? (
                                    data.map((event) => (
                                        <Card key={event.id}>
                                            <CardHeader className="p-0">
                                                <div className="h-52 w-full overflow-hidden rounded-md">
                                                    <Avatar className="w-full h-full rounded-sm  object-cover bg-gray-200">
                                                        <AvatarImage src="/images/home.svg" />
                                                        <AvatarFallback>
                                                            E
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4">
                                                <CardTitle>
                                                    {event.name}
                                                </CardTitle>
                                                <div className="mt-2">
                                                    <CardDescription>
                                                        {(() => {
                                                            const d = new Date(
                                                                event.event_date
                                                            );
                                                            const t =
                                                                new Date();
                                                            d.setHours(
                                                                0,
                                                                0,
                                                                0,
                                                                0
                                                            );
                                                            t.setHours(
                                                                0,
                                                                0,
                                                                0,
                                                                0
                                                            );

                                                            if (d < t)
                                                                return (
                                                                    <div className="text-red-500">
                                                                        Event
                                                                        has
                                                                        ended
                                                                    </div>
                                                                );
                                                            if (
                                                                d.getTime() ===
                                                                t.getTime()
                                                            )
                                                                return (
                                                                    <div className="text-green-500">
                                                                        Event is
                                                                        ongoing
                                                                    </div>
                                                                );
                                                            return `Event starts at ${d.toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                }
                                                            )}`;
                                                        })()}
                                                    </CardDescription>

                                                    <CardDescription>
                                                        Event Type:{" "}
                                                        <Badge variant="secondary">
                                                            {event.type}
                                                        </Badge>
                                                    </CardDescription>
                                                    <CardDescription>
                                                        Sanction:{" "}
                                                        {event.sanction} Pesos
                                                    </CardDescription>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="px-4">
                                                <Button asChild>
                                                    <Link
                                                        href={route(
                                                            "student.submit-attendance",
                                                            event.id
                                                        )}
                                                    >
                                                        SubmitAttendance
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center w-full h-full p-4 text-gray-500">
                                        No events found in this academic year.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
