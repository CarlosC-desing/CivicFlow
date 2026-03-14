import type { Ciudadano, EstadoTipo } from "../../types/ciudadano";
import { useUpdateStatus } from "../../hooks/mutations/useUpdateStatus";
import styles from "./TableTramites.module.scss";

interface Props {
  data: Ciudadano[] | undefined;
}

export const TableTramites = ({ data }: Props) => {
  const { mutate: actualizarEstado, isPending } = useUpdateStatus();

  return (
    <div className={styles.tableContainer}>
      <table className={styles.cTable}>
        <thead className={styles.head}>
          <tr className={`${styles.row} ${styles.header}`}>
            <th className={styles.cell}>Nombre</th>
            <th className={styles.cell}>Estado Actual</th>
            <th className={styles.cell}>Acción</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data?.map((c) => (
            <tr key={c.id} className={styles.row}>
              <td className={styles.cell}>{`${c.nombre} ${c.apellido}`}</td>
              <td className={styles.cell}>
                <span
                  className={`${styles.statusBadge} ${styles[c.estado.toLowerCase().replace(/\s+/g, "")]}`}
                >
                  {c.estado}
                </span>
              </td>
              <td className={styles.cell}>
                <select
                  className={styles.cSelect}
                  value={c.estado}
                  disabled={isPending}
                  onChange={(e) =>
                    actualizarEstado({
                      id: c.id,
                      newStatus: e.target.value as EstadoTipo,
                    })
                  }
                >
                  <option value="Pendiente">Pendiente ⏳</option>
                  <option value="En Proceso">En Proceso ⚙️</option>
                  <option value="Finalizado">Finalizado ✅</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
