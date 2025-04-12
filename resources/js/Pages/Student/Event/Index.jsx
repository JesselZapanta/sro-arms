import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/Components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    Pencil,
    Trash2,
    Loader2,
    CirclePlus,
    Search,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



import { Skeleton } from "@/Components/ui/skeleton";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/Components/InputError";

import { toast } from "sonner";
import { Textarea } from "@/Components/ui/textarea";

export default function Index() {
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
                                    <Select name="organization">
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                key="Semester"
                                                value="Semester"
                                            >
                                                Semester
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Search event"
                                    // value={search}
                                    // onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button>
                                    <Search />
                                    {/* Search */}
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <Card>
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
                                        <CardTitle>Event 1</CardTitle>
                                        <div className="mt-2">
                                            <CardDescription>
                                                Event starts at April 20, 2025
                                            </CardDescription>
                                            <CardDescription>
                                                Event Type: AM
                                            </CardDescription>
                                            <CardDescription>
                                                Sanction: 25 Pesos
                                            </CardDescription>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="px-4">
                                        <Button>Submit Attendance</Button>
                                    </CardFooter>
                                </Card>
                                <Card>
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
                                        <CardTitle>Event 2</CardTitle>
                                        <div className="mt-2">
                                            <CardDescription>
                                                Event is ongoing
                                            </CardDescription>
                                            <CardDescription>
                                                Event Type: AM
                                            </CardDescription>
                                            <CardDescription>
                                                Sanction: 25 Pesos
                                            </CardDescription>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="px-4">
                                        <Button>Submit Attendance</Button>
                                    </CardFooter>
                                </Card>
                                <Card>
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
                                        <CardTitle>Event 3</CardTitle>
                                        <div className="mt-2">
                                            <CardDescription>
                                                Event has ended
                                            </CardDescription>
                                            <CardDescription>
                                                Event Type: AM
                                            </CardDescription>
                                            <CardDescription>
                                                Sanction: 25 Pesos
                                            </CardDescription>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="px-4">
                                        <Button>Submit Attendance</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
