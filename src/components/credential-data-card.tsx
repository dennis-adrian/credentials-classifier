import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Category } from "@/types";
import { getCategoryLabel, type ClasifiedCredentialsData } from "@/utils";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

export const CredentialDataCard = ({
  credentialsData,
  category,
}: {
  credentialsData: ClasifiedCredentialsData[keyof ClasifiedCredentialsData];
  category: Category;
}) => {
  const {
    namedCredentialsCount,
    unamedCredentialsCount,
    participantWithStand,
  } = credentialsData;
  const copyParticipants = () => {
    navigator.clipboard.writeText(
      participantWithStand.map(({ participant }) => participant).join("\n"),
    );
    toast.success("Participantes copiados al portapapeles");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Credenciales de {getCategoryLabel(category, true)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CredentialDataItem
          label="Crenciales con nombre"
          value={namedCredentialsCount}
        />
        <CredentialDataItem
          label="Crenciales sin nombre"
          value={unamedCredentialsCount}
        />
        <div>
          <h3 className="text-sm text-muted-foreground text-center">
            Participantes
          </h3>
          <ScrollArea className="mx-auto h-72 w-56 rounded-md border p-3">
            {participantWithStand.map(({ participant, stand }, i) => (
              <div key={`${participant}-${i}`}>
                <div className="text-sm">
                  {i + 1}. {participant} ({stand})
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center gap-2 w-full justify-center mt-2">
            <span className="text-sm">Copiar participantes</span>
            <Button size="icon" variant="outline" onClick={copyParticipants}>
              <CopyIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CredentialDataItem = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <div className="flex flex-col text-center">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};
