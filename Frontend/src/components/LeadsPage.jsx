import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Analytics from "./ Analytics";

function LeadsPage() {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetchLeads();
    }, [search, status, sortBy, order, page]);


    const fetchLeads = async () => {
        try {

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/getLead`, {
                headers: { token: localStorage.getItem("token") },
                params: { search, status, sortBy, order, page, limit: 10 }
            });

            setLeads(res.data?.leads || []);
            setTotalPages(res.data?.totalPages || 1);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center justify-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Leads</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="createdAt">Created At</option>
                            <option value="name">Name</option>
                        </select>

                        <select
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr className="text-left text-gray-600">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Source</th>
                                    <th className="px-4 py-3">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr
                                        key={lead._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3 font-medium">{lead.name}</td>
                                        <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-3 py-1 text-xs rounded-full font-semibold
                                        ${lead.status === "Converted" && "bg-green-100 text-green-700"}
                                        ${lead.status === "New" && "bg-blue-100 text-blue-700"}
                                        ${lead.status === "Lost" && "bg-red-100 text-red-700"}
                                        ${lead.status === "Qualified" && "bg-purple-100 text-purple-700"}
                                        ${lead.status === "Contacted" && "bg-yellow-100 text-yellow-700"}`}
                                            >
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{lead.source}</td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                            className="px-4 py-2 rounded-xl border hover:bg-gray-100 disabled:opacity-50"
                        >
                            ← Prev
                        </button>

                        <span className="text-sm text-gray-600">
                            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                        </span>

                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-4 py-2 rounded-xl border hover:bg-gray-100 disabled:opacity-50"
                        >
                            Next →
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
                        Analytics
                    </h2>
                    <Analytics />
                </div>
            </div>
        </div>



    );
}

export default LeadsPage;
