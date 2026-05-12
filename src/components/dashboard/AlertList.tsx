"use client";

import { useNotificationListQuery } from "@/redux/feature/projectSlice";
import React, { useState } from "react";

export default function AlertList() {
    const [page, setPage] = useState<number>(1);
    const page_size = 20;

    const { data, isLoading, isError } = useNotificationListQuery({ page, page_size });

    // API response shape: data.data.results
    const notifications = data?.data?.results ?? [];

    return (
        <div className="bg-white p-6 animate-in fade-in slide-in-from-right-5 duration-1000 h-full">
            <h3 className="text-[#1F1F1F]  text-lg lg:text-[28px] font-semibold italic mb-8">Alerts</h3>

            <div className="space-y-4">
                {isLoading && (
                    <div className="text-sm text-gray-500">Loading alerts...</div>
                )}

                {!isLoading && notifications.length === 0 && (
                    <div className="text-sm text-gray-500">No alerts.</div>
                )}

                {notifications.map((alert) => (
                    <div
                        key={alert.id}
                        className="bg-[#F9FAFB] p-6 lg:p-8 flex items-start gap-4 hover:shadow-md transition-all rounded-sm"
                    >
                        <div className={`w-4 h-4 rounded-full shrink-0 mt-1 ${alert.is_read ? 'bg-gray-400' : 'bg-[#038862]'}`} />
                        <div className="space-y-1">
                            <h4 className="text-[#1F1F1F] text-[15px] font-bold">{alert.title}</h4>
                            <p className="text-[#696969] text-xs lg:text-sm leading-relaxed">{alert.message}</p>
                            <p className="text-[#9A9A9A] text-xs">{new Date(alert.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
