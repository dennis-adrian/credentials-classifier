import { useEffect, useState } from "react";
import Papa, { type ParseResult } from "papaparse";
import "./index.css";
import type { CredentialData } from "./types";
import { clasifyCredentials, type ClasifiedCredentialsData } from "./utils";
import { CredentialDataCard } from "@/components/credential-data-card";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [clasifiedCredentials, setClasifiedCredentials] =
    useState<ClasifiedCredentialsData | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  useEffect(() => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results: ParseResult<CredentialData>) => {
          const { data } = results;
          console.log(data);
          setClasifiedCredentials(clasifyCredentials(data));
        },
      });
    }
  }, [file]);

  return (
    <div className="container mx-auto p-3">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {!clasifiedCredentials ? (
        <div className="max-w-xl w-full mx-auto my-3 p-10 text-center text-muted-foreground border border-muted-foreground rounded-sm border-dashed">
          <p>No hay datos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <CredentialDataCard
            credentialsData={clasifiedCredentials.illustration}
            category="illustration"
          />
          <CredentialDataCard
            credentialsData={clasifiedCredentials.entrepreneurship}
            category="entrepreneurship"
          />
          <CredentialDataCard
            credentialsData={clasifiedCredentials.gastronomy}
            category="gastronomy"
          />
        </div>
      )}
    </div>
  );
}

export default App;
