import React from "react";

// libs
import AsyncSelect from "react-select/async";
import { useQuery, gql } from "@apollo/client";

// components
import { client } from "../../https";

import "./continents.styles.css";
interface ContinentsInt {
  name: string;
}

const GET_CONTINENTS = gql`
  {
    continents {
      name
      code
    }
  }
`;

const fetchCountry = async () => {
  const res = await client.query({
    query: gql`
      query {
        continents {
          name
        }
      }
    `,
  });

  if (res.data && res.data.continents) {
    return res.data.continents.map((a: { name: ContinentsInt }) => ({
      label: a.name,
      value: a.name,
    }));
  }
};

const Continents: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CONTINENTS);
  if (loading) return <p>Loading...</p>;
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="input">
      <span>type something</span>
      {data && (
        <AsyncSelect
          placeholder="Wybierz..."
          noOptionsMessage={() => "Brak opcji!"}
          cacheOptions
          loadOptions={fetchCountry}
        />
      )}
    </div>
  );
};

export default Continents;
