import { useRef, useState } from "react";
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
import { useDispatch } from "react-redux";

type Field = "imageUrl" | "streetName" | "depth" | "description" | "pinName";

type Props = {
  values: Partial<Record<Field, string>>;
  onChange: (field: Field, value: string) => void;
  visibleFields?: Field[];
};

const DEFAULT_FIELDS: Field[] = [
  "imageUrl",
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
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const level = ["Ankle-Deep", "Knee-Deep", "Chest-Deep", "Critical"];

  const show = (field: Field) => visibleFields.includes(field);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreview(result);
      onChange("imageUrl", result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-7">
      {/* Photo */}
      {show("imageUrl") && (
        <FieldGroup>
          <Field>
            <FieldLabel className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Photo evidence
            </FieldLabel>
            {!preview ? (
              <div
                onClick={() => fileRef.current?.click()}
                className="flex h-70 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 transition hover:border-gray-400 hover:bg-gray-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">
                  <span className="font-medium text-blue-500">Browse</span> or
                  drop image here
                </p>
                <p className="text-[11px] text-gray-300">
                  JPG, PNG up to 10 MB
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={preview}
                  className="h-70 w-full rounded-xl border border-gray-100 object-cover"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setFileName(null);
                    onChange("imageUrl", "");
                  }}
                  className="absolute right-2 top-2 rounded-full bg-white/80 px-1.5 py-0.5 text-[10px] text-gray-500 backdrop-blur hover:bg-white"
                >
                  Remove
                </button>
                <p className="mt-1 truncate text-[11px] text-gray-400">
                  {fileName}
                </p>
              </div>
            )}
          </Field>
        </FieldGroup>
      )}

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
