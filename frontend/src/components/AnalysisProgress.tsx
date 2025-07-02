import React from 'react';
import { FileText, Loader2 } from 'lucide-react';

interface AnalysisProgressProps {
  fileName: string;
  progress: number;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ fileName, progress }) => {
  const getProgressText = () => {
    if (progress < 25) return 'Lecture du document...';
    if (progress < 50) return 'Extraction du contenu...';
    if (progress < 75) return 'Analyse intelligente...';
    return 'Génération du rapport...';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Analyse en cours</h3>
          <p className="text-sm text-gray-500">{fileName}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{getProgressText()}</span>
          <span className="text-blue-600 font-medium">{progress}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Notre IA analyse votre document avec précision...</span>
        </div>
      </div>
    </div>
  );
};