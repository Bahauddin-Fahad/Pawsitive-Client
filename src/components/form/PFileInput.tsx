"use client";

import { ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";

interface PFileInputProps {
  name: string;
  label: string;
}

export default function PFileInput({ name, label }: PFileInputProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue(name, file);
    setFileName(file ? file.name : null);
  };

  const clearFileSelection = () => {
    setFileName("");
    setValue("image", null);
  };

  return (
    <div className="flex flex-col">
      <label
        className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-primary text-default-800 shadow-sm transition-all duration-100 hover:border-primary"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        accept="image/*"
        className="hidden"
        id={name}
        type="file"
        {...register(name)}
        onChange={handleFileChange}
      />
      {fileName && (
        <div className="mt-2 flex items-center text-sm text-gray-600 justify-between">
          <span
            className="font-medium mr-2 truncate w-60"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            Selected file: {fileName}
          </span>
          <button
            type="button"
            className="text-red-700 hover:text-red-700 font-medium"
            onClick={clearFileSelection}
          >
            Clear
          </button>
        </div>
      )}

      {!fileName && errors[name] && (
        <p className="mt-1 text-sm text-red-600 text-center">
          {errors[name].message as ReactNode}
        </p>
      )}
    </div>
  );
}
