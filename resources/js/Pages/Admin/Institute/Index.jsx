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

export default function Index({ auth }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    //fetching data = institutes
    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
        ].join("&");

        try {
            const res = await axios.get(`/admin/institute/getdata?${params}`);

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

    //creating new data = institute

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "",
    });

    const [institute, setInstitute] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const createForm = () => {
        setErrors({});
        setIsOpen(true);
    };

    const editForm = (institute) => {
        setErrors({});
        setIsOpen(true);
        setInstitute(institute);

        setFormData({
            name: institute.name,
            description: institute.description,
            status: institute.status,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (institute) {
            try {
                const res = await axios.put(
                    `/admin/institute/update/${institute.id}`,
                    formData
                );

                if (res.data.status === "updated") {
                    formCancel();
                    toast.success(
                        "The institute details have been successfully updated."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.post(
                    "/admin/institute/store",
                    formData
                );

                if (res.data.status === "created") {
                    formCancel();
                    toast.success("The institute has been successfully added.");
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
        setInstitute(false);
        setErrors({});
        setFormData({
            name: "",
            description: "",
            status: "",
        });
        getdata();
    };

    //delete data = institute

    const [isDelete, setIsDelete] = useState(false);

    const deleteConfirm = (institute) => {
        setInstitute(institute);
        setIsDelete(true);
    };

    const destroy = async (institute) => {
        setProcessing(true);
        try {
            const res = await axios.delete(
                `/admin/institute/destroy/${institute.id}`
            );

            if (res.data.status === "deleted") {
                formCancel();
                toast.success("Institute deleted successfully.");
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
            <Head title="Institute Management" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="bg-gray-50 p-6 rounded-md">
                            <div className="mb-4">List of institutes</div>

                            <div className="mb-4 flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search institute"
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
                                        <TableHead>Description</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
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
                                        data.map((institute) => (
                                            <TableRow key={institute.id}>
                                                <TableCell>
                                                    {institute.id}
                                                </TableCell>
                                                <TableCell>
                                                    {institute.name}
                                                </TableCell>
                                                <TableCell>
                                                    {truncate(
                                                        institute?.description,
                                                        80
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {institute.status === 1 ? (
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
                                                                editForm(
                                                                    institute
                                                                )
                                                            }
                                                        >
                                                            <Pencil />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                deleteConfirm(
                                                                    institute
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
                                <DialogContent className="sm:max-w-[425px] max-h-[100vh] overflow-y-auto">
                                    <form
                                        onSubmit={onSubmit}
                                        className="flex flex-col gap-6"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <DialogTitle className="text-2xl font-bold">
                                                {institute
                                                    ? "Edit institute"
                                                    : "Create new institute"}
                                            </DialogTitle>
                                            <DialogDescription className="text-balance text-sm text-muted-foreground">
                                                Enter the information below to
                                                {institute
                                                    ? " edit "
                                                    : " create "}{" "}
                                                institute
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
                                                    <Label htmlFor="description">
                                                        Description
                                                    </Label>
                                                    <Textarea
                                                        className="min-h-32"
                                                        value={
                                                            formData.description
                                                        }
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                description:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <InputError
                                                    message={errors.description}
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
                                                ) : institute ? (
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
                                        <DialogTitle>
                                            Delete Institute?
                                        </DialogTitle>
                                        <DialogDescription>
                                            Confirm to permanently delete this
                                            institute?
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
                                            onClick={() => destroy(institute)}
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
