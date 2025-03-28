import React, { useState } from "react";
import { useFormikContext, Field } from "formik";

interface Country {
  name: string;
  code: string;
}
const countries : Country[] = [
    { name: "Canadá", code: "+1" },
    { name: "Estados Unidos", code: "+1" },
    { name: "México", code: "+52" },
    { name: "Belice", code: "+501" },
    { name: "Costa Rica", code: "+506" },
    { name: "El Salvador", code: "+503" },
    { name: "Guatemala", code: "+502" },
    { name: "Honduras", code: "+504" },
    { name: "Nicaragua", code: "+505" },
    { name: "Panamá", code: "+507" },
    { name: "Antigua y Barbuda", code: "+1-268" },
    { name: "Bahamas", code: "+1-242" },
    { name: "Barbados", code: "+1-246" },
    { name: "Cuba", code: "+53" },
    { name: "Dominica", code: "+1-767" },
    { name: "Granada", code: "+1-473" },
    { name: "Haití", code: "+509" },
    { name: "Jamaica", code: "+1-876" },
    { name: "República Dominicana", code: "+1-809, +1-829, +1-849" },
    { name: "San Cristóbal y Nieves", code: "+1-869" },
    { name: "Santa Lucía", code: "+1-758" },
    { name: "San Vicente y las Granadinas", code: "+1-784" },
    { name: "Trinidad y Tobago", code: "+1-868" },
    { name: "Argentina", code: "+54" },
    { name: "Bolivia", code: "+591" },
    { name: "Brasil", code: "+55" },
    { name: "Chile", code: "+56" },
    { name: "Colombia", code: "+57" },
    { name: "Ecuador", code: "+593" },
    { name: "Guyana", code: "+592" },
    { name: "Paraguay", code: "+595" },
    { name: "Perú", code: "+51" },
    { name: "Surinam", code: "+597" },
    { name: "Uruguay", code: "+598" },
    { name: "Venezuela", code: "+58" },
  ];

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
