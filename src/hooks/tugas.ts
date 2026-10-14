import { useMemo } from "react";
import { tugasData, byDeadline } from "../lib/tugas";
import type { Tugas } from "../types/tugas";

interface Options {
	matkulId?: string;
	status?: boolean;
}

export function useTugas({ matkulId, status }: Options = {}): Tugas[] {
	return useMemo(
		() =>
			tugasData
				.filter(
					(t) =>
						(matkulId === undefined || t.matkul_id === matkulId) &&
						(status === undefined || t.status === status),
				)
				.sort(byDeadline),
		[matkulId, status],
	);
}

export function useTugasDetail(id: string): Tugas | undefined {
	return useMemo(() => tugasData.find((t) => t.id === id), [id]);
}