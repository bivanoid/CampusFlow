import { useTugas } from "../hooks/tugas"
import s from "./tugas.module.css"


export default function Tugas() {

	const dataTugas = useTugas();
	
	return (
		<div className={s.con_tugas}>
			{dataTugas.map((tugas) => (
				<p>{tugas.judul}</p>
			))}
		</div>
	)
}