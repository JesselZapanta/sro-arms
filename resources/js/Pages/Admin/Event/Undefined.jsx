import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { OctagonAlert } from 'lucide-react';


export default function Undefined() {
    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <OctagonAlert />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-400">
                        <p>No Attendance</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
