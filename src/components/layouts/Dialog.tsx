// src/components/dialog/Dialog.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./dialog.module.css";

interface Props {
	open: boolean;
	text: string;
	title?: string;
	option?: boolean; 
	confirmLabel?: string;
	cancelLabel?: string;
	danger?: boolean; 
	onConfirm: () => void;
	onCancel: () => void;
}

export default function Dialog({
	open,
	text,
	title,
	option = true,
	confirmLabel = "OK",
	cancelLabel = "Batal",
	danger = false,
	onConfirm,
	onCancel,
}: Props) {
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onCancel();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, onCancel]);

	if (!open) return null;

	return createPortal(
		<div className={s.overlay} onClick={onCancel}>
			<div
				className={s.dialog}
				role="dialog"
				aria-modal="true"
				onClick={(e) => e.stopPropagation()} // klik di dalam dialog tidak menutup
			>
				{title && <h3>{title}</h3>}
				<p>{text}</p>

				<div className={s.actions}>
					{option && (
						<button type="button" className={s.cancel} onClick={onCancel}>
							{cancelLabel}
						</button>
					)}
					<button
						type="button"
						className={danger ? s.danger : s.confirm}
						onClick={onConfirm}
					>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
}