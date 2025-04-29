import { Button } from "@/Components/ui/button";
import { numberToWords } from "amount-to-words";
import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function Reciept({ data, receipt, setReceipt }) {
    const [loading, setLoading] = useState(false);
    const [print, setPrint] = useState(false);

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        documentTitle: "Reciept",
        contentRef: componentRef,
    });

    //save first, if res.data.status === saved
    //admin/receipt/store
    //store the no
    //print

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            name: data?.user.firstname + " " + data?.user.lastname,
            amount: data?.total_sanction,
        };

        try {
            const res = await axios.post("/admin/receipt/store", formData);

            if (res.data.status === "created") {
                setReceipt(res.data.receipt);
                setPrint(true);
            }

            // //is this good?
            // if (receipt) {
            //     handlePrint();
            // }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (receipt && print) {
            handlePrint();
            setPrint(false);
        }
    }, [receipt, print]);

    // const getId = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await axios.get("/admin/receipt/getid");
    //         setNo(res.data.no);
    //     } catch (err) {
    //         console.log(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     getId();
    // }, []);

    // console.log(no);

    return (
        <>
            <div className="mt-4 bg-gray-100 p-4 rounded-md">
                <div className="flex justify-between">
                    <div className="text-md font-bold">
                        <p>Total Absent: {data.total_absent}</p>
                        <p>Total Sanction: {data.total_sanction}</p>
                    </div>
                    <div>
                        <Button onClick={handleSubmit}>Print Reciept</Button>
                    </div>
                </div>
                <div className="print-container" ref={componentRef}>
                    <div className="w-full h-[288px] bg-gray-50 rounded-md p-6">
                        <h2 className="text-center font-bold text-3xl tracking-[20px]">
                            RECEIPT
                        </h2>
                        <div className="flex justify-between">
                            <div className="w-52 h-12 flex items-end">
                                <div className="flex items-end gap-2 w-full">
                                    <span className="mb-[-2px]">No.</span>
                                    <div className="flex-1 border-b-2 border-black">
                                        <span className="ml-4 text-violet-800 text-xl tracking-[10px]">
                                            {receipt}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-52 h-12 flex items-end">
                                <div className="flex items-end gap-2 w-full">
                                    <span className="mb-[-2px]">Date:</span>
                                    <div className="flex-1 border-b-2 border-black">
                                        <span className="ml-4 text-xl">
                                            {new Date().toLocaleDateString()}
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
                                            <span>{data?.user.firstname}</span>
                                            <span className="ml-2">
                                                {data?.user.lastname}
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
                                                data.total_sanction
                                            ) + " Pesos only"}
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
                                            Sanction for Event Attendance Only
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
                                            {data.total_sanction + ".00"}
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
                </div>
            </div>
        </>
    );
}
