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

export default function Index({ auth, institutes }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    //fetching data = users
    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
        ].join("&");

        try {
            const res = await axios.get(`/admin/user/getdata?${params}`);

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

    console.log(data)

    //creating new data = user

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        institute: "",
        organization: "",
        studentId: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        status: "",
    });

    const [user, setUser] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const createForm = () => {
        setErrors({});
        setIsOpen(true);
    };

    const editForm = (user) => {
        setErrors({});
        setIsOpen(true);
        setUser(user);

        setFormData({
            firstname: user.firstname,
            middlename: user.middlename,
            lastname: user.lastname,
            institute: user.institute,
            organization: user.organization,
            studentId: user.studentId,
            email: user.email,
            role: user.role,
            status: user.status,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (user) {
            try {
                const res = await axios.put(
                    `/admin/user/update/${user.id}`,
                    formData
                );

                if (res.data.status === "updated") {
                    formCancel();
                    toast.success(
                        "The user details have been successfully updated."
                    );
                }
            } catch (err) {
                setErrors(err.response.data.errors);
            } finally {
                setProcessing(false);
            }
        } else {
            try {
                const res = await axios.post("/admin/user/store", formData);

                if (res.data.status === "created") {
                    formCancel();
                    toast.success("The user has been successfully added.");
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
        setUser(false);
        setErrors({});
        setFormData({
            firstname: "",
            middlename: "",
            lastname: "",
            institute: "",
            organization: "",
            studentId: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "",
            status: "",
        });
        getdata();
    };

    //delete data = user

    const [isDelete, setIsDelete] = useState(false);

    const deleteConfirm = (user) => {
        setUser(user);
        setIsDelete(true);
    };

    const destroy = async (user) => {
        setProcessing(true);
        try {
            const res = await axios.delete(`/admin/user/destroy/${user.id}`);

            if (res.data.status === "deleted") {
                formCancel();
                toast.success("User deleted successfully.");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="User Management" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="bg-gray-50 p-6 rounded-md">
                            <div className="mb-4">List of users</div>

                            <div className="mb-4 flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search user"
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
                                        <TableHead>Student Id</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Institute</TableHead>
                                        <TableHead>Organization</TableHead>
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
                                        data.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>{user.studentId}</TableCell>
                                                <TableCell>
                                                    { user.firstname}{" "}
                                                    {user.middlename}{" "}
                                                    {user.lastname} 
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    {user.institute}
                                                </TableCell>
                                                <TableCell>
                                                    {user.organization}
                                                </TableCell>
                                                <TableCell className="flex justify-end">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                editForm(user)
                                                            }
                                                        >
                                                            <Pencil />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                deleteConfirm(
                                                                    user
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
                                <DialogContent className="sm:max-w-[625px]">
                                    <form
                                        onSubmit={onSubmit}
                                        className="flex flex-col gap-6"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <h1 className="text-2xl font-bold">
                                                {user
                                                    ? "Create a new account"
                                                    : "Edit user"}
                                            </h1>
                                            <p className="text-balance text-sm text-muted-foreground">
                                                Enter the information below to
                                                {user
                                                    ? " edit "
                                                    : " create "}{" "}
                                                your account
                                            </p>
                                        </div>

                                        <div className="grid gap-6">
                                            <div className="flex gap-2">
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="firstname">
                                                            First Name
                                                        </Label>
                                                        <Input
                                                            id="firstname"
                                                            type="text"
                                                            value={
                                                                formData.firstname
                                                            }
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    firstname:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.firstname
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="middlename">
                                                            Middle Name
                                                            (Optional)
                                                        </Label>
                                                        <Input
                                                            id="middlename"
                                                            type="text"
                                                            value={
                                                                formData.middlename
                                                            }
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    middlename:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.middlename
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="lastname">
                                                            Last Name
                                                        </Label>
                                                        <Input
                                                            id="lastname"
                                                            type="text"
                                                            value={
                                                                formData.lastname
                                                            }
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    lastname:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.lastname
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="institute">
                                                            Institute
                                                        </Label>
                                                        <Select
                                                            name="institute"
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    institute:
                                                                        String(
                                                                            value
                                                                        ),
                                                                })
                                                            }
                                                            value={String(
                                                                formData.institute
                                                            )}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {institutes.map(
                                                                    (
                                                                        institute
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                institute.name
                                                                            }
                                                                            value={String(
                                                                                institute.name
                                                                            )}
                                                                        >
                                                                            {
                                                                                institute.name
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
                                                        <Label htmlFor="organization">
                                                            Organization
                                                        </Label>
                                                        <Select
                                                            name="organization"
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    organization:
                                                                        String(
                                                                            value
                                                                        ),
                                                                })
                                                            }
                                                            value={String(
                                                                formData.organization
                                                            )}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="light">
                                                                    Light
                                                                </SelectItem>
                                                                <SelectItem value="dark">
                                                                    Dark
                                                                </SelectItem>
                                                                <SelectItem value="system">
                                                                    System
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.organization
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="studentId">
                                                            Student ID
                                                        </Label>
                                                        <Input
                                                            id="studentId"
                                                            type="number"
                                                            value={
                                                                formData.studentId
                                                            }
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    studentId:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.studentId
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="email">
                                                            Email
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={
                                                                formData.email
                                                            }
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    email: e
                                                                        .target
                                                                        .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={errors.email}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="password">
                                                            Password
                                                        </Label>
                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            value={
                                                                formData.password
                                                            }
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    password:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.password
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="password_confirmation">
                                                            Re-type Password
                                                        </Label>
                                                        <Input
                                                            id="password_confirmation"
                                                            type="password_confirmation"
                                                            value={
                                                                formData.password_confirmation
                                                            }
                                                            onChange={(e) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    password_confirmation:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.password_confirmation
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-full grid gap-2">
                                                    <div>
                                                        <Label htmlFor="role">
                                                            Role
                                                        </Label>
                                                        <Select
                                                            name="role"
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    role: String(
                                                                        value
                                                                    ),
                                                                })
                                                            }
                                                            value={String(
                                                                formData.role
                                                            )}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="1">
                                                                    Admin
                                                                </SelectItem>
                                                                <SelectItem value="2">
                                                                    Student
                                                                </SelectItem>
                                                                <SelectItem value="3">
                                                                    Officer
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.organization
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
                                                                    In active
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
                                                ) : user ? (
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
                                        <DialogTitle>Delete User?</DialogTitle>
                                        <DialogDescription>
                                            Confirm to permanently delete this
                                            user?
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
                                            onClick={() => destroy(user)}
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
