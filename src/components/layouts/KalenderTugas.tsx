"use client";
import s from "./kalender.module.css";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { id as localeId } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { useTugas } from "../../hooks/tugas";

export default function KalenderTugas() {
	const [selected, setSelected] = useState<Date | undefined>(new Date());

	const tanggalAdaTugas = useTugas().map(
		(t) => new Date(t.deadline + "T00:00:00")
	);

	return (
		<div className={s.con_kalender}>
			<DayPicker
				mode="single"
				locale={localeId}
				selected={selected}
				onSelect={setSelected}
				navLayout="around"
				showOutsideDays
				modifiers={{ adaTugas: tanggalAdaTugas }}
				modifiersStyles={{
					adaTugas: { fontWeight: 900, color: "var(--dark1)" },
				}}
			/>
		</div>
	);
}