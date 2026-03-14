import { useState } from "react";
import { TableCiudadanos } from "../../components/TableCiudadanos/TableCiudadanos";
import { useCiudadanos } from "../../hooks/queries/useCiudadanos";
import { useCiudadano } from "../../hooks/queries/useCiudadano";
import { useCreateCiudadano } from "../../hooks/mutations/useCreateCiudadano";
import { FormCiudadano } from "../../components/FormCiudadano/FormCiudadano";
import { CiudadanoCard } from "../../components/Cards/CiudadanoCard";

export const CiudadanosPage = () => {
  const { data: ciudadanos, isLoading } = useCiudadanos();
  const { mutate: crear, isPending: creando } = useCreateCiudadano();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { data: detalle, isLoading: cargandoDetalle } = useCiudadano(
    selectedId ?? "",
  );

  const handleCreateSubmit = (formData: any) => {
    const cedulaFormateada = formData.cedula.startsWith("V-")
      ? formData.cedula
      : `V-${formData.cedula}`;

    crear(
      { ...formData, cedula: cedulaFormateada },
      { onSuccess: () => setIsAdding(false) },
    );
  };

  if (isLoading) return <div className="loading">Cargando ciudadanos...</div>;

  return (
    <div className="page-container--ciudadanos">
      <header className="page-header">
        <h1>Gestión de Ciudadanos</h1>
        <button className="btn--registry" onClick={() => setIsAdding(true)}>
          + Registrar Ciudadano
        </button>
      </header>

      <TableCiudadanos data={ciudadanos} onView={(id) => setSelectedId(id)} />

      {selectedId && (
        <CiudadanoCard
          ciudadano={detalle}
          onClose={() => setSelectedId(null)}
          isLoading={cargandoDetalle}
        />
      )}

      {isAdding && (
        <FormCiudadano
          onClose={() => setIsAdding(false)}
          onSubmit={handleCreateSubmit}
          isPending={creando}
        />
      )}
    </div>
  );
};
