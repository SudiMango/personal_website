"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/client";
import { RoleResponse } from "@/lib/schemas";
import { btnGhost, btnDanger } from "@/lib/classnames";
import { RoleForm } from "./RoleForm";

export const RoleRow = ({
    role,
    onRefresh,
}: {
    role: RoleResponse;
    onRefresh: () => void;
}) => {
    const [editing, setEditing] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Delete role "${role.role_title}"?`)) return;
        const id = toast.loading("Deleting role...");
        try {
            await apiClient.delete(`/role/${role.role_id}`);
            toast.success("Role deleted.", { id });
            onRefresh();
        } catch {
            toast.error("Something went wrong.", { id });
        }
    };

    return (
        <div className="flex flex-col border-l-2 border-(--border) pl-4 py-1">
            {editing ? (
                <RoleForm
                    experienceId={role.experience_id}
                    initial={role}
                    onDone={() => {
                        setEditing(false);
                        onRefresh();
                    }}
                    onCancel={() => setEditing(false)}
                />
            ) : (
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-text-primary">
                            {role.role_title}
                        </span>
                        <span className="text-[0.7rem] text-text-muted">
                            {role.date_range}
                        </span>
                        <span className="text-[0.75rem] text-text-secondary mt-1 leading-relaxed">
                            {role.description}
                        </span>
                        {role.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {role.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[0.6rem] px-2 py-0.5 rounded-full border border-(--border-strong) text-text-secondary bg-bg-base"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <span className="text-[0.75rem] text-text-secondary mt-1 leading-relaxed">
                            Sort order: {role.sort_order}
                        </span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <button
                            onClick={() => setEditing(true)}
                            className={btnGhost}
                        >
                            <Pencil size={13} />
                        </button>
                        <button onClick={handleDelete} className={btnDanger}>
                            <Trash2 size={13} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
