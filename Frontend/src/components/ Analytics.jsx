import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Analytics() {
    const [analytics, setAnalytics] = useState({
        totalLeads: 0,
        convertedLeads: 0,
        leadsByStage: [],
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetchAnalytics();
    }, []);


    const fetchAnalytics = async () => {
        try {

            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/analytics`, {
                headers: {
                    token: token
                }
            });

            setAnalytics({
                totalLeads: res.data?.totalLeads || 0,
                convertedLeads: res.data?.convertedLeads || 0,
                leadsByStage: res.data?.leadsByStage || [],
            });
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Analytics Overview
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-100 text-blue-800 rounded-xl p-4 text-center">
                    <p className="text-sm font-medium">Total Leads</p>
                    <p className="text-2xl font-bold">{analytics.totalLeads}</p>
                </div>

                <div className="bg-green-100 text-green-800 rounded-xl p-4 text-center">
                    <p className="text-sm font-medium">Converted</p>
                    <p className="text-2xl font-bold">{analytics.convertedLeads}</p>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Leads by Stage
            </h3>

            <ul className="space-y-2">
                {analytics.leadsByStage.map((stage) => (
                    <li
                        key={stage._id}
                        className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
                    >
                        <span className="text-gray-700 font-medium">
                            {stage._id}
                        </span>
                        <span className="bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
                            {stage.count}
                        </span>
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default Analytics;
