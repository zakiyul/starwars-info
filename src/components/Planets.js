import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";

import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPlanets
  );

  return (
    <div>
      <h2>Planets</h2>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Prev
      </button>
      <span> {page} </span>
      <button
        onClick={() =>
          setPage((old) => (!latestData || !latestData.next ? old : old + 1))
        }
      >
        Next
      </button>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error Fetching Date</div>}
      {status === "success" && (
        <div>
          {resolvedData.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
