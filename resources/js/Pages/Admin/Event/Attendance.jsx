import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Attendance({id}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [lastpage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    const getdata = async () => {
        try {
            setLoading(true);

            const params = [`id=${id}`].join("&");

            const res = await axios.get(`/admin/attendance/getdata?${params}`);

            setData(res.data.data);
            // setPage(res.data.current_page)
            // setLastPage(res.data.last_page)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getdata();
    }, [search, page]);

    return (
        <AuthenticatedLayout>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </AuthenticatedLayout>
    );
}
