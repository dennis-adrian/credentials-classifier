import type { Category, CredentialData } from "../types";

export type ClasifiedCredentialsData = {
  [key in Category]: {
    participantWithStand: {
      participant: string;
      stand: string;
    }[];
    namedCredentialsCount: number;
    unamedCredentialsCount: number;
  };
};

export const clasifyCredentials = (
  data: CredentialData[],
): ClasifiedCredentialsData => {
  const illustrationParticipations = data.filter(
    (item) => item.category === "illustration",
  );
  const entrepreneurshipParticipations = data.filter(
    (item) => item.category === "entrepreneurship",
  );
  const gastronomyParticipations = data.filter(
    (item) => item.category === "gastronomy",
  );
  console.log(illustrationParticipations);

  const illustrationParticipationsByStand = illustrationParticipations.reduce(
    (acc, item) => {
      acc[item.stand] = (acc[item.stand] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  console.log(illustrationParticipationsByStand);

  /**
   * Illustraiotn participants that don't share a stand should receive a second unnamed credential
   */
  const illustrationUniqueStands: string[] = [];
  for (const stand in illustrationParticipationsByStand) {
    if (illustrationParticipationsByStand[stand] === 1) {
      illustrationUniqueStands.push(stand);
    }
  }

  return {
    illustration: {
      participantWithStand: illustrationParticipations.map((item) => ({
        participant: item.participant,
        stand: item.stand,
      })),
      namedCredentialsCount: illustrationParticipations.length,
      unamedCredentialsCount: illustrationUniqueStands.length,
    },
    entrepreneurship: {
      participantWithStand: entrepreneurshipParticipations.map((item) => ({
        participant: item.participant,
        stand: item.stand,
      })),
      namedCredentialsCount: entrepreneurshipParticipations.length,
      unamedCredentialsCount: entrepreneurshipParticipations.length,
    },
    gastronomy: {
      participantWithStand: gastronomyParticipations.map((item) => ({
        participant: item.participant,
        stand: item.stand,
      })),
      /**
       * Every gastronomy participant should receive two named credentials
       */
      namedCredentialsCount: gastronomyParticipations.length * 2,
      unamedCredentialsCount: 0,
    },
  };
};

export const getCategoryLabel = (
  category: Category,
  isCapitalized: boolean = false,
) => {
  switch (category) {
    case "illustration":
      return isCapitalized ? "Ilustración" : "ilustración";
    case "entrepreneurship":
      return isCapitalized ? "Emprendimiento" : "emprendimiento";
    case "gastronomy":
      return isCapitalized ? "Gastronomía" : "gastronomía";
    default:
      return isCapitalized ? "Invalid category" : "invalid category";
  }
};
