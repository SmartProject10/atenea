import React, { useState } from "react";
import { useFormikContext, Field } from "formik";

interface Country {
  name: string;
  code: string;
}


interface FilterableSelectProps {
  countries: Country[];
}

const FilterableSelect: React.FC<FilterableSelectProps> = ({ countries }) => {
  const [search, setSearch] = useState(""); // Estado para búsqueda
  const { setFieldValue } = useFormikContext(); // Hook de Formik para acceder al contexto del formulario

  // Filtrar países según la búsqueda
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar país..."
        className="form-input w-full px-4 py-2 mb-2 border border-gray-300 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Select filtrable */}
      <select
        name="country"
        className="form-select bg-transparent w-full border border-gray-300 rounded px-4 py-2"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFieldValue("country", e.target.value); // Actualiza el valor del campo en Formik
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))
        ) : (
          <option value="">No hay resultados</option>
        )}
      </select>
    </div>
  );
};

export default FilterableSelect;
