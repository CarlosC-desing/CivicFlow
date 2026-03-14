import { useDeleteCiudadano } from "../../hooks/mutations/useDeleteCiudadano";
import type { Ciudadano } from "../../types/ciudadano";
import styles from "./TableCiudadanos.module.scss";

interface Props {
  data: Ciudadano[] | undefined;
  onView: (id: string) => void;
}

export const TableCiudadanos = ({ data, onView }: Props) => {
  const { mutate: eliminar, isPending: estaEliminando } = useDeleteCiudadano();

  return (
    <div className={styles.tableContainer}>
      <table className={styles.cTable}>
        <thead className={styles.head}>
          <tr className={`${styles.row} ${styles.header}`}>
            <th className={styles.cell}>Nombre</th>
            <th className={styles.cell}>Cédula</th>
            <th className={styles.cell}>Acciones</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data?.map((c) => (
            <tr key={c.id} className={styles.row}>
              <td className={styles.cell}>{`${c.nombre} ${c.apellido}`}</td>
              <td className={styles.cell}>{c.cedula}</td>
              <td className={styles.cell}>
                <div className={styles.actions}>
                  <button
                    className={`${styles.cButton} ${styles.view}`}
                    onClick={() => onView(c.id)}
                  >
                    Ver
                  </button>
                  <button
                    className={`${styles.cButton} ${styles.delete}`}
                    onClick={() => eliminar(c.id)}
                    disabled={estaEliminando}
                  >
                    {estaEliminando ? "..." : "Eliminar"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
