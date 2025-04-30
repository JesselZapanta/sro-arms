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
    Eye,
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
import Reciept from './../Reciept/Reciept';
import { numberToWords } from "amount-to-words";

export default function Index({ auth }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    const [receipt, setReceipt] = useState([]);
    

    //fetching data = saved-receipt
    const getdata = async () => {
        setLoading(true);

        const params = [
            `page=${page}`,
            `sortField=${sortField}`,
            `sortOrder=${sortOrder}`,
            `search=${search}`,
        ].join("&");

        try {
            const res = await axios.get(
                `/admin/saved-receipt/getdata?${params}`
            );

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

    const dateFormat = (date) => {
        return date ? date.slice(0, 10) : " ";
    }

    const [show, setShow] = useState(false);

    const showReceipt = (receipt) => {
        // console.log(receipt);
        setReceipt(receipt);
        setShow(true);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Institute Management" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="bg-gray-50 p-6 rounded-md">
                            <div className="mb-4">List of saved receipt</div>

                            <div className="mb-4 flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search saved receipt"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button onClick={getdata}>
                                    <Search />
                                    {/* Search */}
                                </Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Control No</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Date</TableHead>
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
                                        data.map((receipt) => (
                                            <TableRow key={receipt.id}>
                                                <TableCell>
                                                    {receipt.id}
                                                </TableCell>
                                                <TableCell>
                                                    {receipt.name}
                                                </TableCell>
                                                <TableCell>
                                                    {receipt.amount + " pesos"}
                                                </TableCell>
                                                <TableCell>
                                                    {dateFormat(receipt.date)}
                                                    {/* {receipt.date} */}
                                                </TableCell>
                                                <TableCell className="flex justify-end">
                                                    <Button
                                                        size="icon"
                                                        variant="secondary"
                                                        onClick={() =>
                                                            showReceipt(receipt)
                                                        }
                                                    >
                                                        <Eye />
                                                    </Button>
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

                            <Dialog open={show} onOpenChange={setShow}>
                                <DialogContent className="sm:max-w-[800px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Reciept Details
                                        </DialogTitle>
                                        <DialogDescription>
                                            <div className="w-full h-[288px] bg-gray-50 rounded-md p-6">
                                                <h2 className="text-center font-bold text-3xl tracking-[20px]">
                                                    RECEIPT
                                                </h2>
                                                <div className="flex justify-between">
                                                    <div className="w-52 h-12 flex items-end">
                                                        <div className="flex items-end gap-2 w-full">
                                                            <span className="mb-[-2px]">
                                                                No.
                                                            </span>
                                                            <div className="flex-1 border-b-2 border-black">
                                                                <span className="ml-4 text-violet-800 text-xl tracking-[10px]">
                                                                    {receipt.id}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-52 h-12 flex items-end">
                                                        <div className="flex items-end gap-2 w-full">
                                                            <span className="mb-[-2px]">
                                                                Date:
                                                            </span>
                                                            <div className="flex-1 border-b-2 border-black">
                                                                <span className="ml-4 text-xl">
                                                                    {dateFormat(
                                                                        receipt.date
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex flex-col gap-2">
                                                    <div className="flex items-end">
                                                        <div className="flex items-end gap-2 w-full">
                                                            <span className="mb-[-2px] pl-24">
                                                                Recieved from
                                                            </span>
                                                            <div className="flex-1 border-b-2 border-black">
                                                                <span className="ml-4 text-xl tracking-[5px]">
                                                                    <span>
                                                                        {
                                                                            receipt.name
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-end">
                                                        <div className="flex items-end gap-2 w-full">
                                                            <span className="mb-[-2px]">
                                                                The sum of pesos
                                                            </span>
                                                            <div className="flex-1 border-b-2 border-black">
                                                                <span className="ml-4 text-xl tracking-[5px]">
                                                                    {numberToWords(
                                                                        receipt.amount
                                                                    ) +
                                                                        " Pesos only"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-end">
                                                        <div className="flex items-end gap-2 w-full">
                                                            <span className="mb-[-2px]">
                                                                as payment
                                                            </span>
                                                            <div className="flex-1 border-b-2 border-black">
                                                                <span className="ml-4 text-xl tracking-[5px]">
                                                                    Sanction for
                                                                    Event
                                                                    Attendance
                                                                    Only
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="w-52 h-12 flex items-end">
                                                        <div className="flex items-end gap-2 w-full">
                                                            <span className="mb-[-2px] text-3xl uppercase font-black">
                                                                P
                                                            </span>
                                                            <div className="flex-1 border-b-2 border-black">
                                                                <span className="ml-4 text-xl tracking-[5px]">
                                                                    {receipt.amount +
                                                                        ".00"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-52 h-12 flex items-end">
                                                        <div className="flex items-end gap-2 w-full">
                                                            <span className="mb-[-2px]">
                                                                Signature:
                                                            </span>
                                                            <div className="flex-1 border-b-2 border-black">
                                                                <span className="ml-4 text-xl"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
