import { useState, useEffect } from "react";
import type { TramiteTipo, EstadoTipo, Ciudadano } from "../../types/ciudadano";
import styles from "./FormCiudadano.module.scss";

interface Props {
  onClose: () => void;
  onSubmit: (data: Omit<Ciudadano, "id">) => void;
  isPending: boolean;
}

export const FormCiudadano = ({ onClose, onSubmit, isPending }: Props) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    tramite: "Nacimiento" as TramiteTipo,
    estado: "Pendiente" as EstadoTipo,
    fechaRegistro: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Registrar Nuevo Ciudadano</h2>
          <button className={styles.btnClose} onClick={onClose}>
            ×
          </button>
        </div>

        <form className={styles.formCiudadano} onSubmit={handleSubmit}>
          <input
            placeholder="Nombre"
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            placeholder="Apellido"
            required
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
          />
          <input
            placeholder="Cédula (ej: 12345678)"
            required
            value={form.cedula}
            onChange={(e) => setForm({ ...form, cedula: e.target.value })}
          />

          <label>Tipo de Trámite:</label>
          <select
            value={form.tramite}
            onChange={(e) =>
              setForm({ ...form, tramite: e.target.value as TramiteTipo })
            }
          >
            <option value="Nacimiento">Nacimiento</option>
            <option value="Matrimonio">Matrimonio</option>
            <option value="Defunción">Defunción</option>
          </select>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={isPending}
            >
              {isPending ? "Guardando..." : "Guardar Ciudadano"}
            </button>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
