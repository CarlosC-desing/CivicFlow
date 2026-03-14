import { useEffect } from "react";
import type { Ciudadano } from "../../types/ciudadano";
import styles from "./CiudadanoCard.module.scss";

interface Props {
  ciudadano: Ciudadano | undefined;
  onClose: () => void;
  isLoading: boolean;
}

export const CiudadanoCard = ({ ciudadano, onClose, isLoading }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Detalle del Ciudadano</h2>
          <button className={styles.btnClose} onClick={onClose}>
            ×
          </button>
        </div>

        {isLoading ? (
          <p className={styles.loadingText}>Cargando detalles...</p>
        ) : (
          <div className={styles.detalleInfo}>
            <div className={styles.infoGrid}>
              <p>
                <strong>Nombre:</strong> {ciudadano?.nombre}{" "}
                {ciudadano?.apellido}
              </p>
              <p>
                <strong>Cédula:</strong> {ciudadano?.cedula}
              </p>
              <p>
                <strong>Trámite:</strong> {ciudadano?.tramite}
              </p>
              <p>
                <strong>Estado:</strong>
                <span
                  className={`${styles.statusBadge} ${styles[ciudadano?.estado.toLowerCase() || ""]}`}
                >
                  {ciudadano?.estado}
                </span>
              </p>
              <p>
                <strong>Fecha de Registro:</strong> {ciudadano?.fechaRegistro}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
