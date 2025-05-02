import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getdata = async () => {
        setLoading(true);
        try{
            const res = await axios.get('/student/dashboard/getdata')

            setData(res.data)

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Events</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-green-600">
                                        {data}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Updated at{" "}
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

