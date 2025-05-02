import { Link } from "@inertiajs/react";

import {
    NavigationMenu,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";


export default function Welcome({ auth }) {
    return (
        <div>
            <div className="bg-emerald-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/logo.svg"
                            alt="Ims"
                            className="h-16 w-16 rounded-full border-2 border-emerald-700"
                        />
                        <h1 className="text-2xl font-semibold text-emerald-800">
                            ARMS
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className={`${navigationMenuTriggerStyle()} bg-emerald-600 text-white`}
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className={`${navigationMenuTriggerStyle()} bg-emerald-600 text-white`}
                                        >
                                            Login
                                        </Link>
                                    </>
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </div>

            <div className="mt-6 px-4 flex text-center flex-col items-center bg">
                <h2 className="text-2xl py-4 sm:text-5xl font-semibold text-gray-800">
                    SRO Attendance and Reaciept <br /> Monitoring System
                </h2>
                <p className="py-2 text-md sm:text-xl font-light text-gray-800">
                    A web-based system for tracking attendance and managing
                    receipts
                    <br /> in the Student Recognized Organization (SRO).
                </p>
                <div className="mt-4">
                    <img src="/images/home3.svg" alt="Ims" className="h-96" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
                <h2 className="text-xl sm:text-3xl font-semibold text-gray-800">
                    How Does it work?
                </h2>
                <p className="py-4 text-md sm:text-lg font-light text-gray-800">
                    A web app for tracking products, managing categories,
                    suppliers, and user access.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 mt-4 justify-center gap-6">
                    <div>
                        <div className="mt-4 flex flex-col">
                            <img
                                src="/images/category.svg"
                                alt="Event Management"
                                className="h-24"
                            />
                        </div>
                        <h3 className="py-2 font-bold text-lg">
                            Event Management
                        </h3>
                        <p className="text-gray-600 text-justify">
                            Create, schedule, and manage events efficiently.
                            Monitor event details and
                            ensure seamless organization for successful
                            implementation.
                        </p>
                    </div>

                    <div>
                        <div className="mt-4 flex flex-col">
                            <img
                                src="/images/user.svg"
                                alt="Attendance Submission"
                                className="h-24"
                            />
                        </div>
                        <h3 className="py-2 font-bold text-lg">
                            Submit Attendance
                        </h3>
                        <p className="text-gray-600 text-justify">
                            Allow participants to submit their attendance
                            digitally. Track attendee records in real time and
                            ensure accurate participation logs for every event.
                        </p>
                    </div>

                    <div>
                        <div className="mt-4 flex flex-col">
                            <img
                                src="/images/supplier.svg"
                                alt="Receipt Management"
                                className="h-24"
                            />
                        </div>
                        <h3 className="py-2 font-bold text-lg">
                            Receipt Management
                        </h3>
                        <p className="text-gray-600 text-justify">
                            Monitor and store receipts related to event
                            expenses. Ensure transparency and accountability.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-emerald-100 text-center p-4">
                Copyright © {new Date().getFullYear()} All rights reserved.
            </div>
        </div>
    );
}
