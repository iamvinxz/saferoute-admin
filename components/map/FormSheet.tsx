import { useRef, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FloodReport, updateFloorReport } from "@/state/slices/segment";
import { arrowDown, arrowUp } from "@/lib/icon";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  index: number;
  floodReport: FloodReport;
};

const FormSheet = ({ index, floodReport }: Props) => {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const level = ["Ankle-Deep", "Knee-Deep", "Chest-Deep", "Critical"];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleChange = (
    index: number,
    field: keyof FloodReport,
    value: string,
  ) => {
    dispatch(updateFloorReport({ index, field, value }));
  };

  return (
    <div className="space-y-7">
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
              <p className="text-[11px] text-gray-300">JPG, PNG up to 10 MB</p>
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
                  handleChange(index, "imageUrl", "");
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

      {/* Street */}
      <FieldGroup>
        <Field>
          <FieldLabel className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Street name
          </FieldLabel>
          <Input
            type="text"
            placeholder="e.g. Crispin Street"
            value={floodReport.streetName}
            onChange={(e) => handleChange(index, "streetName", e.target.value)}
            className="rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </Field>
      </FieldGroup>
      {/* Depth */}
      <FieldGroup>
        <Field>
          <FieldLabel className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Flood depth
          </FieldLabel>
          <DropdownMenu onOpenChange={setIsDropDownOpen}>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center">
                <button className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm text-gray-400 hover:border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                  {floodReport.depth || "Select flood depth"}
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
                {level.map((level) => (
                  <DropdownMenuItem
                    key={level}
                    onClick={() => handleChange(index, "depth", level)}
                    className="text-gray-400"
                  >
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="mt-1 text-[11px] text-gray-400">
            <span className="font-semibold">Enter depth in meters or feet</span>
          </span>
        </Field>
      </FieldGroup>
    </div>
  );
};

export default FormSheet;
