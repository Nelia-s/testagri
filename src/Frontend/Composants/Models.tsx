export interface entreprise {
  etablissement: etablissement;
}

export interface etablissement {
  uniteLegale: uniteLegale;
  adresseEtablissement: adresseEtablissement;
}

export interface uniteLegale {
  denominationUniteLegale: string;
}

export interface adresseEtablissement {
  numeroVoieEtablissement: string;
  typeVoieEtablissement: string;
  libelleVoieEtablissement: string;
  complementAdresseEtablissement: string | null;
  codePostalEtablissement: string;
  libelleCommuneEtablissement: string;
}
