import { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { arrowDown, arrowUp } from "@/lib/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FormField = "streetName" | "depth" | "description" | "pinName";

type Props = {
  values: Partial<Record<FormField, string>>;
  onChange: (field: FormField, value: string) => void;
  visibleFields?: FormField[];
};

const DEFAULT_FIELDS: FormField[] = [
  "streetName",
  "depth",
  "description",
  "pinName",
];

const FormSheet = ({
  values,
  onChange,
  visibleFields = DEFAULT_FIELDS,
}: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const level = ["Ankle-Deep", "Knee-Deep", "Chest-Deep", "Critical"];

  const show = (field: FormField) => visibleFields.includes(field);
  return (
    <div className="space-y-7">
      {/* Pin Name */}
      {show("pinName") && (
        <FieldGroup>
          <Field>
            <FieldLabel className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Pin name
            </FieldLabel>
            <Input
              type="text"
              placeholder="e.g. Flood checkpoint"
              value={values.pinName ?? ""}
              onChange={(e) => onChange("pinName", e.target.value)}
              className="rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400"
            />
          </Field>
        </FieldGroup>
      )}

      {/* Street */}
      {show("streetName") && (
        <FieldGroup>
          <Field>
            <FieldLabel className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Street name
            </FieldLabel>
            <Input
              type="text"
              placeholder="e.g. Crispin Street"
              value={values.streetName ?? ""}
              onChange={(e) => onChange("streetName", e.target.value)}
              className="rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400"
            />
          </Field>
        </FieldGroup>
      )}

      {/* Depth */}
      {show("depth") && (
        <FieldGroup>
          <Field>
            <FieldLabel className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Flood depth
            </FieldLabel>
            <DropdownMenu onOpenChange={setIsDropDownOpen}>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center">
                  <button className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm text-gray-400 hover:border-gray-300">
                    {values.depth || "Select flood depth"}
                  </button>
                  {isDropDownOpen ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: arrowUp }}
                      className="absolute right-15"
                    />
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{ __html: arrowDown }}
                      className="absolute right-15"
                    />
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {level.map((l) => (
                    <DropdownMenuItem
                      key={l}
                      onClick={() => onChange("depth", l)}
                      className="text-gray-400"
                    >
                      {l}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Field>
        </FieldGroup>
      )}

      {/* Description */}
      {show("description") && (
        <FieldGroup>
          <Field>
            <FieldLabel className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Description
            </FieldLabel>
            <Textarea
              placeholder="e.g. Road is impassable due to flooding..."
              value={values.description ?? ""}
              onChange={(e) => onChange("description", e.target.value)}
              className="rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400"
            />
          </Field>
        </FieldGroup>
      )}
    </div>
  );
};

export default FormSheet;
