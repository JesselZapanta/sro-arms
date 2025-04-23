import { Check } from 'lucide-react'
import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


export default function Format({ time, image }) {
    return (
        <Dialog>
            <DialogTrigger>
                <Check />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Uploaded at: {time}</DialogTitle>
                    <DialogDescription>
                        <div className="w-full h-full my-2 overflow-hidden">
                            <img
                                src={`/storage/${image}`}
                                className="w-full rounded-xl object-cover"
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
