import React from 'react';
import { FileText, Key, AlertTriangle, Lightbulb, BookOpen, Calendar, Download } from 'lucide-react';
import { DocumentAnalysis } from '../types';

interface AnalysisResultProps {
  analysis: DocumentAnalysis;
  onNewAnalysis: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, onNewAnalysis }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{analysis.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <span>{analysis.fileName}</span>
                <span>•</span>
                <span>{formatFileSize(analysis.fileSize)}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(analysis.uploadDate)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onNewAnalysis}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Nouvelle analyse
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé exécutif</h3>
        <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Key Points */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Points clés</h3>
          </div>
          <ul className="space-y-3">
            {analysis.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recommandations</h3>
          </div>
          <ul className="space-y-3">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        {analysis.risks.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Points de vigilance</h3>
            </div>
            <ul className="space-y-3">
              {analysis.risks.map((risk, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Terms */}
        {analysis.technicalTerms.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Termes techniques</h3>
            </div>
            <div className="space-y-4">
              {analysis.technicalTerms.map((term, index) => (
                <div key={index} className="border-l-4 border-purple-200 pl-4">
                  <h4 className="font-medium text-gray-900">{term.term}</h4>
                  <p className="text-sm text-gray-600 mt-1">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};