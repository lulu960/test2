import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isAnalyzing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      setSelectedFile(pdfFile);
      onFileSelect(pdfFile);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (selectedFile && !isAnalyzing) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
              <File className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{selectedFile.name}</h3>
              <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <button
            onClick={clearFile}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        isDragOver
          ? 'border-blue-400 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      } ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <Upload className="h-8 w-8 text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Télécharger un document PDF
          </h3>
          <p className="text-gray-500 mb-4">
            Glissez-déposez votre fichier PDF ici ou cliquez pour sélectionner
          </p>
          <label className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors">
            <Upload className="h-4 w-4" />
            Choisir un fichier
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              disabled={isAnalyzing}
            />
          </label>
        </div>
        <p className="text-xs text-gray-400">
          Formats acceptés : PDF uniquement • Taille max : 10MB
        </p>
      </div>
    </div>
  );
};