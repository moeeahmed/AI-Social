import React from "react";

type ResultsProps = {
  results?: string;
};

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <h1>Results:</h1>
          {results && <p className="border p-2">{results}</p>}
        </div>
      </div>
    </form>
  );
};

export default Results;
