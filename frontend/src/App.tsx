import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { AnalysisProgress } from './components/AnalysisProgress';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeDocument, simulateProgress } from './services/documentAnalyzer';
import { AnalysisState } from './types';

function App() {
  const { user, token, login, logout, isLoading: authLoading } = useAuth();
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isAnalyzing: false,
    progress: 0,
    error: null,
    currentAnalysis: null,
    history: []
  });

  const handleFileSelect = async (file: File) => {
    setAnalysisState(prev => ({
      ...prev,
      isAnalyzing: true,
      progress: 0,
      error: null
    }));

    try {
      // Simulate progress
      await simulateProgress((progress) => {
        setAnalysisState(prev => ({ ...prev, progress }));
      });

      if (!token) throw new Error('No auth token');

      // Analyze document via backend
      const analysis = await analyzeDocument(file, token);
      
      setAnalysisState(prev => ({
        ...prev,
        isAnalyzing: false,
        currentAnalysis: analysis,
        history: [analysis, ...prev.history]
      }));
    } catch (error) {
      setAnalysisState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: 'Erreur lors de l\'analyse du document'
      }));
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisState(prev => ({
      ...prev,
      currentAnalysis: null,
      progress: 0,
      error: null
    }));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={login} isLoading={authLoading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {analysisState.currentAnalysis ? (
          <AnalysisResult 
            analysis={analysisState.currentAnalysis} 
            onNewAnalysis={handleNewAnalysis}
          />
        ) : (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Analysez vos documents en quelques secondes
              </h2>
              <p className="text-lg text-gray-600">
                Notre assistant IA analyse vos documents PDF et génère des résumés structurés, 
                des recommandations pertinentes et identifie les points de vigilance.
              </p>
            </div>

            {analysisState.isAnalyzing ? (
              <AnalysisProgress 
                fileName="Document en cours d'analyse"
                progress={analysisState.progress}
              />
            ) : (
              <FileUpload 
                onFileSelect={handleFileSelect}
                isAnalyzing={analysisState.isAnalyzing}
              />
            )}

            {analysisState.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {analysisState.error}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;