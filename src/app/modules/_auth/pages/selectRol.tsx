import React, { useState } from "react";
import { useFormikContext, Field } from "formik";

interface Rol {
  name: string;
}


interface FilterableRoleProps {
  roles: Rol[];
}

const FilterableRole: React.FC<FilterableRoleProps> = ({ roles }) => {
  const [buscar, setSearch] = useState(""); // Estado para búsqueda
  const { setFieldValue } = useFormikContext(); // Hook de Formik para acceder al contexto del formulario

  // Filtrar países según la búsqueda
  const filteredRoles = roles.filter((rol) =>
    rol.name.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div className="relative w-full">
      {/* Campo de búsqueda */}
      <input
        type="text"
        name="rol"
        placeholder="Buscar Rol..."
        className="form-input w-full px-4 py-2 mb-2 border border-gray-300 rounded"
        value={buscar}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Select filtrable */}
      <select
        name="rol"
        className="form-select bg-transparent w-full border border-gray-300 rounded px-4 py-2"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("rol", e.target.value); // Actualiza el valor del campo en Formik
        }}
      >
        {filteredRoles.length > 0 ? (
          filteredRoles.map((roles) => (
            <option key={roles.name} value={roles.name}>
              {roles.name})
            </option>
          ))
        ) : (
          <option value="">No hay resultados</option>
        )}
      </select>
    </div>
  );
};

export default FilterableRole;
