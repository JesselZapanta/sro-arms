import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { X } from 'lucide-react';


export default function Absent() {
    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger><X/></TooltipTrigger>
                    <TooltipContent className="bg-red-400">
                        <p>Absent</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
