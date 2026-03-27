"use client";
import { useState } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/client";
import { RoleResponse } from "@/lib/schemas";
import { inputClass, labelClass, btnPrimary, btnGhost } from "@/lib/classnames";

interface RoleFormProps {
    experienceId: string;
    initial?: RoleResponse;
    onDone: () => void;
    onCancel: () => void;
}

export const RoleForm = ({
    experienceId,
    initial,
    onDone,
    onCancel,
}: RoleFormProps) => {
    const [roleTitle, setRoleTitle] = useState(initial?.role_title ?? "");
    const [dateRange, setDateRange] = useState(initial?.date_range ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [sortOrder, setSortOrder] = useState<number | "">(
        initial?.sort_order ?? 0,
    );
    const [tagsInput, setTagsInput] = useState(initial?.tags.join(", ") ?? "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const id = toast.loading(
            initial ? "Updating role..." : "Creating role...",
        );
        const tags = tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        try {
            if (initial) {
                await apiClient.patch(`/role/${initial.role_id}`, {
                    role_title: roleTitle,
                    date_range: dateRange,
                    sort_order: sortOrder,
                    description,
                    tags,
                });
            } else {
                await apiClient.post(`/role/${experienceId}`, {
                    role_title: roleTitle,
                    date_range: dateRange,
                    sort_order: sortOrder,
                    description,
                    tags,
                });
            }
            toast.success(initial ? "Role updated." : "Role created.", { id });
            onDone();
        } catch {
            toast.error("Something went wrong.", { id });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-4 rounded-lg border border-(--border) bg-bg-base mt-2"
        >
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Role Title</label>
                <input
                    className={inputClass}
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Date Range</label>
                <input
                    className={inputClass}
                    placeholder="e.g. Jan 2025 - Present"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Description</label>
                <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Tags (comma separated)</label>
                <input
                    className={inputClass}
                    placeholder="e.g. React, TypeScript, Node.js"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Sort Order</label>
                <input
                    type="number"
                    min={0}
                    className={inputClass}
                    value={sortOrder}
                    onChange={(e) =>
                        setSortOrder(
                            e.target.value === "" ? "" : Number(e.target.value),
                        )
                    }
                    required
                />
            </div>
            <div className="flex gap-2 mt-1">
                <button type="submit" disabled={loading} className={btnPrimary}>
                    {initial ? "Save" : "Create"}
                </button>
                <button type="button" onClick={onCancel} className={btnGhost}>
                    Cancel
                </button>
            </div>
        </form>
    );
};
