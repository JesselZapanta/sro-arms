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

import { Skeleton } from "@/Components/ui/skeleton";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/Components/InputError";

import { toast } from "sonner";
import { Textarea } from "@/Components/ui/textarea";

export default function Index({ auth, academicYears }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    //fetching data = events
    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
        ].join("&");

        try {
            const res = await axios.get(`/admin/event/getdata?${params}`);

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

    // console.log(data)

    //creating new data = event

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        event_date: "",
        type: "",
        am_start: "",
        am_end: "",
        pm_start: "",
        pm_end: "",
        sanction: "",
        academicYear: "",
        status: "",
    });

    const [event, setEvent] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const createForm = () => {
        setErrors({});
        setIsOpen(true);
    };

    const formatDate = (datetime) => {
        return datetime ? datetime.split("T")[0] : "";
    };

    const formatTime = (datetime) => {
        return datetime ? datetime.split("T")[1].slice(0, 5) : "";
    };

    const editForm = (event) => {
        setErrors({});
        setIsOpen(true);
        setEvent(event);

        setFormData({
            name: event.name,
            event_date: formatDate(event.event_date),
            type: event.type,
            am_start: formatTime(event.am_start),
            am_end: formatTime(event.am_end),
            pm_start: formatTime(event.pm_start),
            pm_end: formatTime(event.pm_end),
            sanction: event.sanction,
            academicYear: event.academicYear,
            status: event.status,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (event) {
            try {
                const res = await axios.put(
                    `/admin/event/update/${event.id}`,
                    formData
                );

                if (res.data.status === "updated") {
                    formCancel();
                    toast.success(
                        "The event details have been successfully updated."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.post("/admin/event/store", formData);

                if (res.data.status === "created") {
                    formCancel();
                    toast.success("The event has been successfully added.");
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        }
    };

    const formCancel = () => {
        setIsOpen(false);
        setIsDelete(false);
        setEvent(false);
        setErrors({});
        setFormData({
            name: "",
            event_date: "",
            type: "",
            am_start: "",
            am_end: "",
            pm_start: "",
            pm_end: "",
            sanction: "",
            academicYear: "",
            status: "",
        });
        getdata();
    };

    //delete data = event

    const [isDelete, setIsDelete] = useState(false);

    const deleteConfirm = (event) => {
        setEvent(event);
        setIsDelete(true);
    };

    const destroy = async (event) => {
        setProcessing(true);
        try {
            const res = await axios.delete(`/admin/event/destroy/${event.id}`);

            if (res.data.status === "deleted") {
                formCancel();
                toast.success("Event deleted successfully.");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setProcessing(false);
        }
    };

    //text limit
    const truncate = (text, limit) => {
        if (text.length > limit) {
            return text.slice(0, limit) + "...";
        }
        return text;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Event Management" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="bg-gray-50 p-6 rounded-md">
                            <div className="mb-4">List of events</div>

                            <div className="mb-4 flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search event"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button onClick={getdata}>
                                    <Search />
                                    {/* Search */}
                                </Button>
                                <Button onClick={createForm}>
                                    <CirclePlus />
                                    New
                                </Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Event Date</TableHead>
                                        <TableHead>Sanction</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
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
                                        data.map((event) => (
                                            <TableRow key={event.id}>
                                                <TableCell>
                                                    {event.id}
                                                </TableCell>
                                                <TableCell>
                                                    {event.name}
                                                </TableCell>
                                                <TableCell>
                                                    {event.type}
                                                </TableCell>
                                                {/* <TableCell>
                                                    {new Date(
                                                        event.event_date
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </TableCell> */}
                                                <TableCell>
                                                    {event.sanction}
                                                </TableCell>
                                                <TableCell>
                                                    {event.status === 1 ? (
                                                        <span className="text-green-500">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-500">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="flex justify-end">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                editForm(event)
                                                            }
                                                        >
                                                            <Pencil />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                deleteConfirm(
                                                                    event
                                                                )
                                                            }
                                                        >
                                                            <Trash2 />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan="4"
                                                className="py-12 text-center"
                                            >
                                                No data found
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

                            {/* form dialog */}

                            <Dialog open={isOpen} onOpenChange={formCancel}>
                                <DialogContent className="sm:max-w-[525px] max-h-[100vh] overflow-y-auto">
                                    <form
                                        onSubmit={onSubmit}
                                        className="flex flex-col gap-6"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <DialogTitle className="text-2xl font-bold">
                                                {event
                                                    ? "Create a new account"
                                                    : "Edit event"}
                                            </DialogTitle>
                                            <DialogDescription className="text-balance text-sm text-muted-foreground">
                                                Enter the information below to
                                                {event
                                                    ? " edit "
                                                    : " create "}{" "}
                                                your account
                                            </DialogDescription>
                                        </div>

                                        <div className="grid gap-6">
                                            <div className="w-full grid gap-2">
                                                <div>
                                                    <Label htmlFor="name">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                name: e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </div>
                                            <div className="w-full grid gap-2">
                                                <div>
                                                    <Label htmlFor="event_date">
                                                        Event Date
                                                    </Label>
                                                    <Input
                                                        id="event_date"
                                                        type="date"
                                                        value={
                                                            formData.event_date
                                                        }
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                event_date:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <InputError
                                                    message={errors.event_date}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="sanction">
                                                            Sanction
                                                        </Label>
                                                        <Input
                                                            id="sanction"
                                                            type="number"
                                                            value={
                                                                formData.sanction
                                                            }
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    sanction:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.sanction
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="type">
                                                            Event Type
                                                        </Label>
                                                        <Select
                                                            name="type"
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    type: String(
                                                                        value
                                                                    ),
                                                                })
                                                            }
                                                            value={String(
                                                                formData.type
                                                            )}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="AM">
                                                                    AM
                                                                </SelectItem>
                                                                <SelectItem value="PM">
                                                                    PM
                                                                </SelectItem>
                                                                <SelectItem value="WD">
                                                                    WD
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <InputError
                                                        message={errors.status}
                                                    />
                                                </div>
                                            </div>
                                            {(formData.type === "AM" ||
                                                formData.type === "WD") && (
                                                <div className="flex gap-2">
                                                    <div className="w-full grid gap-2">
                                                        <div>
                                                            <Label htmlFor="am_start">
                                                                AM Start
                                                            </Label>
                                                            <Input
                                                                id="am_start"
                                                                type="time"
                                                                min="00:00"
                                                                max="11:59"
                                                                value={
                                                                    formData.am_start
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            am_start:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        <InputError
                                                            message={
                                                                errors.am_start
                                                            }
                                                        />
                                                    </div>
                                                    <div className="w-full grid gap-2">
                                                        <div>
                                                            <Label htmlFor="am_end">
                                                                AM End
                                                            </Label>
                                                            <Input
                                                                id="am_end"
                                                                type="time"
                                                                min="00:00"
                                                                max="11:59"
                                                                value={
                                                                    formData.am_end
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            am_end: e
                                                                                .target
                                                                                .value,
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        <InputError
                                                            message={
                                                                errors.am_end
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {(formData.type === "PM" ||
                                                formData.type === "WD") && (
                                                <div className="flex gap-2">
                                                    <div className="w-full grid gap-2">
                                                        <div>
                                                            <Label htmlFor="pm_start">
                                                                PM Start
                                                            </Label>
                                                            <Input
                                                                id="pm_start"
                                                                type="time"
                                                                min="12:00"
                                                                max="23:59"
                                                                value={
                                                                    formData.pm_start
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            pm_start:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        <InputError
                                                            message={
                                                                errors.pm_start
                                                            }
                                                        />
                                                    </div>
                                                    <div className="w-full grid gap-2">
                                                        <div>
                                                            <Label htmlFor="pm_end">
                                                                PM End
                                                            </Label>
                                                            <Input
                                                                id="pm_end"
                                                                type="time"
                                                                min="12:00"
                                                                max="23:59"
                                                                value={
                                                                    formData.pm_end
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setFormData(
                                                                        {
                                                                            ...formData,
                                                                            pm_end: e
                                                                                .target
                                                                                .value,
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        <InputError
                                                            message={
                                                                errors.pm_end
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex gap-2">
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="academicYear">
                                                            Academic Year
                                                        </Label>
                                                        <Select
                                                            name="academicYear"
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    academicYear:
                                                                        String(
                                                                            value
                                                                        ),
                                                                })
                                                            }
                                                            value={String(
                                                                formData.academicYear
                                                            )}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {academicYears.map(
                                                                    (year) => (
                                                                        <SelectItem
                                                                            key={
                                                                                year.id
                                                                            }
                                                                            value={String(
                                                                                year.id
                                                                            )}
                                                                        >
                                                                            {
                                                                                year.description
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.institute
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="status">
                                                            Status
                                                        </Label>
                                                        <Select
                                                            name="status"
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    status: String(
                                                                        value
                                                                    ),
                                                                })
                                                            }
                                                            value={String(
                                                                formData.status
                                                            )}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="1">
                                                                    Active
                                                                </SelectItem>
                                                                <SelectItem value="0">
                                                                    Inactive
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <InputError
                                                        message={errors.status}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter className="mt-4">
                                            <Button
                                                variant="secondary"
                                                onClick={formCancel}
                                                className="w-full"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full"
                                            >
                                                {processing ? (
                                                    <span className="flex items-center gap-2">
                                                        <Loader2 className="animate-spin" />
                                                        Please wait
                                                    </span>
                                                ) : event ? (
                                                    "Update"
                                                ) : (
                                                    "Create"
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            {/* delete */}

                            <Dialog open={isDelete} onOpenChange={formCancel}>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Delete Event?</DialogTitle>
                                        <DialogDescription>
                                            Confirm to permanently delete this
                                            event?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="mt-4">
                                        <Button
                                            variant="secondary"
                                            onClick={formCancel}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => destroy(event)}
                                        >
                                            Delete
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
