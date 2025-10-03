export type Category = "illustration" | "entrepreneurship" | "gastronomy";

export type CredentialData = {
  category: Category;
  participant: string;
  stand: string;
};

export type CredentialCategoryData = {
  uniqueParticipantsCount: number;
  namedCredentialsCount: number;
  unamedCredentialsCount: number;
};
