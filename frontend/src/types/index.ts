export interface User {
  id: string;
  email: string;
  name: string;
}

export interface DocumentAnalysis {
  id: string;
  fileName: string;
  title: string;
  summary: string;
  keyPoints: string[];
  recommendations: string[];
  risks: string[];
  technicalTerms: { term: string; definition: string }[];
  uploadDate: Date;
  fileSize: number;
}

export interface AnalysisState {
  isAnalyzing: boolean;
  progress: number;
  error: string | null;
  currentAnalysis: DocumentAnalysis | null;
  history: DocumentAnalysis[];
}