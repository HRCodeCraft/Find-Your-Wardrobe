"use client";

import { useRef, useState } from "react";

interface Props {
  onFilesSelected: (files: File[]) => void;
  isAnalyzing: boolean;
}

export default function UploadZone({ onFilesSelected, isAnalyzing }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (imageFiles.length > 0) onFilesSelected(imageFiles);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      className={`
        relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200
        ${isDragging ? "border-orange-400 bg-orange-50 scale-[1.01]" : "border-gray-300 bg-white hover:border-orange-300 hover:bg-orange-50/50"}
        ${isAnalyzing ? "pointer-events-none opacity-60" : ""}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="flex flex-col items-center gap-3">
        {isAnalyzing ? (
          <>
            <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-orange-600 font-medium">AI analyze kar raha hai...</p>
          </>
        ) : (
          <>
            <div className="text-5xl">👗</div>
            <div>
              <p className="text-gray-700 font-semibold text-lg">Apne kapde upload karo</p>
              <p className="text-gray-400 text-sm mt-1">
                Photos drag karo ya click karo — AI automatically category, color aur style detect karega
              </p>
            </div>
            <span className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors">
              Photos Choose Karo
            </span>
          </>
        )}
      </div>
    </div>
  );
}
