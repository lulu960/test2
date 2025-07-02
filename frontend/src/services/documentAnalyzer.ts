import { DocumentAnalysis } from '../types';

// Simulated LLM analysis with improved document type detection
export const analyzeDocument = async (file: File): Promise<DocumentAnalysis> => {
  return new Promise((resolve) => {
    // Simulate API processing time
    setTimeout(() => {
      // Detect document type based on filename and generate appropriate analysis
      const documentType = detectDocumentType(file.name);
      const analysis: DocumentAnalysis = generateAnalysisByType(file, documentType);
      
      resolve(analysis);
    }, 3000);
  });
};

const detectDocumentType = (fileName: string): string => {
  const name = fileName.toLowerCase();
  
  if (name.includes('cv') || name.includes('resume') || name.includes('curriculum')) {
    return 'cv';
  }
  if (name.includes('contrat') || name.includes('contract')) {
    return 'contract';
  }
  if (name.includes('rapport') || name.includes('report')) {
    return 'report';
  }
  if (name.includes('facture') || name.includes('invoice')) {
    return 'invoice';
  }
  if (name.includes('reglement') || name.includes('rules')) {
    return 'rules';
  }
  if (name.includes('bail') || name.includes('lease')) {
    return 'lease';
  }
  
  // Default fallback based on common patterns
  return 'document';
};

const generateAnalysisByType = (file: File, type: string): DocumentAnalysis => {
  const baseAnalysis = {
    id: Date.now().toString(),
    fileName: file.name,
    uploadDate: new Date(),
    fileSize: file.size
  };

  switch (type) {
    case 'cv':
      return {
        ...baseAnalysis,
        title: "Curriculum Vitae - Profil Professionnel",
        summary: "Ce CV présente le parcours professionnel d'un candidat avec une expérience diversifiée dans le secteur technologique. Le profil révèle une progression de carrière cohérente avec des compétences techniques solides et une capacité d'adaptation démontrée. Les expériences couvrent différents domaines d'expertise avec une spécialisation marquée dans le développement logiciel et la gestion de projet.",
        keyPoints: [
          "Expérience professionnelle de 5+ années dans le développement web",
          "Maîtrise des technologies React, Node.js, et bases de données SQL",
          "Formation supérieure en informatique avec spécialisation développement",
          "Compétences linguistiques : français natif, anglais professionnel",
          "Expérience en gestion d'équipe et conduite de projets",
          "Certifications professionnelles en développement agile"
        ],
        recommendations: [
          "Mettre en avant les réalisations quantifiées (chiffres, résultats)",
          "Ajouter une section projets personnels ou open source",
          "Préciser les méthodologies de travail maîtrisées (Scrum, Kanban)",
          "Inclure des liens vers portfolio ou profils professionnels",
          "Adapter le CV selon le poste visé pour optimiser la pertinence",
          "Vérifier l'orthographe et la cohérence des dates"
        ],
        risks: [
          "Périodes d'inactivité non expliquées dans le parcours",
          "Manque de références professionnelles vérifiables",
          "Compétences techniques non actualisées selon les standards actuels"
        ],
        technicalTerms: [
          {
            term: "Stack technique",
            definition: "Ensemble des technologies, langages et outils utilisés pour développer une application (front-end, back-end, base de données)."
          },
          {
            term: "Développement agile",
            definition: "Méthodologie de développement logiciel privilégiant la collaboration, l'adaptabilité et la livraison itérative de fonctionnalités."
          },
          {
            term: "Full-stack",
            definition: "Développeur capable de travailler sur toutes les couches d'une application, du front-end au back-end et à la base de données."
          }
        ]
      };

    case 'contract':
      return {
        ...baseAnalysis,
        title: "Contrat de Prestation de Services",
        summary: "Ce document constitue un contrat de prestation de services entre deux parties commerciales, définissant les modalités d'exécution, les obligations respectives, la durée d'engagement et les conditions de rémunération. Il établit un cadre juridique précis pour la collaboration, incluant les clauses de confidentialité, les pénalités en cas de non-respect des délais, et les conditions de résiliation anticipée.",
        keyPoints: [
          "Durée du contrat : 24 mois avec possibilité de reconduction tacite",
          "Montant global : 150 000€ HT payable en mensualités",
          "Clause de confidentialité stricte sur toutes les données échangées",
          "Délai de livraison : 6 mois maximum à compter de la signature",
          "Garantie de conformité de 12 mois sur les prestations",
          "Résiliation possible avec préavis de 3 mois"
        ],
        recommendations: [
          "Vérifier la solvabilité du cocontractant avant signature",
          "Négocier une clause de révision tarifaire annuelle",
          "Prévoir une assurance responsabilité civile professionnelle",
          "Définir précisément les critères d'acceptation des livrables",
          "Établir un planning détaillé avec jalons de validation"
        ],
        risks: [
          "Pénalités de retard pouvant atteindre 10% du montant total",
          "Clause résolutoire automatique en cas de défaillance majeure",
          "Responsabilité illimitée en cas de violation de confidentialité",
          "Absence de clause de force majeure détaillée"
        ],
        technicalTerms: [
          {
            term: "Clause résolutoire",
            definition: "Disposition contractuelle permettant la résiliation automatique du contrat en cas de manquement grave d'une partie à ses obligations."
          },
          {
            term: "Tacite reconduction",
            definition: "Renouvellement automatique d'un contrat à son échéance, sans démarche particulière des parties, pour une durée déterminée."
          }
        ]
      };

    case 'report':
      return {
        ...baseAnalysis,
        title: "Rapport d'Analyse et Recommandations",
        summary: "Ce rapport présente une analyse détaillée de la situation actuelle avec des données factuelles, des tendances observées et des recommandations stratégiques. Il couvre les aspects opérationnels, financiers et organisationnels avec une approche méthodique et des conclusions étayées par des indicateurs de performance.",
        keyPoints: [
          "Analyse de performance sur 12 mois avec indicateurs clés",
          "Identification de 3 axes d'amélioration prioritaires",
          "Recommandations budgétaires pour l'exercice suivant",
          "Évaluation des risques opérationnels et financiers",
          "Plan d'action avec échéancier et responsabilités définies"
        ],
        recommendations: [
          "Mettre en place un tableau de bord de suivi mensuel",
          "Former les équipes aux nouvelles procédures recommandées",
          "Allouer un budget spécifique pour les améliorations prioritaires",
          "Planifier des points de contrôle trimestriels",
          "Documenter les processus optimisés"
        ],
        risks: [
          "Résistance au changement des équipes opérationnelles",
          "Budget insuffisant pour implémenter toutes les recommandations",
          "Délais serrés pour la mise en œuvre des changements"
        ],
        technicalTerms: [
          {
            term: "KPI",
            definition: "Key Performance Indicator - Indicateur clé de performance utilisé pour mesurer l'efficacité d'une action ou d'un processus."
          },
          {
            term: "Benchmark",
            definition: "Méthode de comparaison des performances avec les meilleures pratiques du secteur ou des concurrents."
          }
        ]
      };

    case 'invoice':
      return {
        ...baseAnalysis,
        title: "Facture Commerciale",
        summary: "Document comptable officiel détaillant une transaction commerciale entre un fournisseur et un client. La facture respecte les obligations légales de facturation avec les mentions obligatoires, les détails des prestations ou produits fournis, et le calcul des taxes applicables.",
        keyPoints: [
          "Montant total HT : 2 450,00€ - TVA 20% : 490,00€ - Total TTC : 2 940,00€",
          "Prestations de conseil en développement logiciel sur 3 mois",
          "Conditions de paiement : 30 jours net à réception",
          "Numéro de facture et date d'émission conformes",
          "Coordonnées complètes des parties (SIRET, TVA intracommunautaire)"
        ],
        recommendations: [
          "Vérifier la conformité des mentions légales obligatoires",
          "S'assurer de la cohérence avec le devis initial signé",
          "Archiver la facture selon les obligations comptables (10 ans)",
          "Suivre les délais de paiement et relancer si nécessaire",
          "Vérifier l'éligibilité à déduction de la TVA"
        ],
        risks: [
          "Pénalités de retard applicables en cas de dépassement des délais",
          "Risque de rejet comptable si mentions obligatoires manquantes",
          "Prescription de l'action en paiement après 5 ans"
        ],
        technicalTerms: [
          {
            term: "TVA intracommunautaire",
            definition: "Numéro d'identification fiscale pour les échanges commerciaux entre entreprises de l'Union Européenne."
          },
          {
            term: "Mentions légales obligatoires",
            definition: "Informations que doit contenir une facture selon la réglementation : identité des parties, numéro, date, description, prix, TVA."
          }
        ]
      };

    default:
      return {
        ...baseAnalysis,
        title: "Document Professionnel",
        summary: "Document contenant des informations structurées nécessitant une analyse approfondie. Le contenu présente des éléments factuels organisés selon une logique spécifique avec des implications pratiques et des points d'attention particuliers à considérer.",
        keyPoints: [
          "Structure documentaire claire avec sections identifiées",
          "Informations factuelles vérifiables et datées",
          "Références et sources mentionnées le cas échéant",
          "Objectifs et finalités du document explicites",
          "Public cible et contexte d'utilisation définis"
        ],
        recommendations: [
          "Vérifier l'actualité des informations présentées",
          "Croiser les données avec d'autres sources fiables",
          "Identifier les actions concrètes à mettre en œuvre",
          "Évaluer l'impact sur les processus existants",
          "Planifier le suivi et la mise à jour du document"
        ],
        risks: [
          "Informations potentiellement obsolètes ou incomplètes",
          "Interprétation erronée des données présentées",
          "Manque de contexte pour une application pratique"
        ],
        technicalTerms: [
          {
            term: "Document de référence",
            definition: "Document servant de base ou de modèle pour des décisions, actions ou autres documents dans un contexte professionnel."
          }
        ]
      };
  }
};

export const simulateProgress = (onProgress: (progress: number) => void): Promise<void> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(progress);
        setTimeout(resolve, 500);
      } else {
        onProgress(Math.min(progress, 95));
      }
    }, 200);
  });
};