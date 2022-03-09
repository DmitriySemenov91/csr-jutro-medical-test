import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";

// styles
import "./country.styles.css";

interface CountryInt {
  name: string;
  capital: string;
  emoji: string;
  languages: Languages[];
}

interface Languages {
  code: string;
  name: string;
}

interface stateCodeCountry {
  codePart: string;
}
// na takiej podstronie trzeba wyświetlić: name, code, emoji i languages (language.name)
// we using index, because we don't have ani other options in this case

const Country: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as stateCodeCountry;

  const GET_COUNTRY = gql`
  {
    country(code: "${state?.codePart.toLocaleUpperCase()}") {
      name
      capital
      emoji
      languages {
        code
        name
      }
    }
  }
`;

  const { data, loading, error } = useQuery(GET_COUNTRY);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <div>{error}</div>;
  }
  const keys = Object.keys(data) as Array<keyof CountryInt>;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Go back</button>
      {data &&
        keys?.map((item, index: number) => {
          return (
            <div key={index} className="box">
              <p>Name: {data[item].name}</p>
              <p>Capital: {data[item].capital}</p>
              <p>Emoji: {data[item].emoji}</p>
              <p>Language-code: {data[item].languages[0].code}</p>
              <p>Language-name: {data[item].languages[0].name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Country;
