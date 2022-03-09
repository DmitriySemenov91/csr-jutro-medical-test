import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// components
import Continents from "../continets/continets.page";

// styles
import "./countries.styles.css";

interface Countries {
  name: string;
  code: string;
}

const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

// we using index, because we don't have ani other options in this case
//also using state with router, because we don't need here redux or context
const Countries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="parentWrapper">
      <div>
        <Continents />
      </div>
      <div className="input">
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      {data &&
        data?.countries
          .filter((country: Countries) => {
            if (searchTerm.length > 0) {
              return country.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
                ? country
                : null;
            }
            return country;
          })
          .map(({ name, code }: Countries, index: number) => {
            return (
              <div key={index} className="wrapper">
                <span className="countryName">{name}</span>
                <span
                  className="button"
                  onClick={() =>
                    navigate(`${code.toLowerCase()}`, {
                      state: {
                        codePart: code,
                      },
                    })
                  }
                >
                  {code}
                </span>
              </div>
            );
          })}
    </div>
  );
};

export default Countries;
