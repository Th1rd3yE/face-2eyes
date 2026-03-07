export type AnalysisResult = {
  classification: "Likely Accurate" | "Uncertain" | "Potentially Misleading";
  confidence: number;
  signals: string[];
  explanation: string;
  sources: {
    title: string;
    description: string;
    url: string;
  }[];
  viralityRisk: "Low" | "Medium" | "High";
  viralityReasons: string[];
};

export const mockResults: Record<string, AnalysisResult> = {
  misleading: {
    classification: "Potentially Misleading",
    confidence: 78,
    signals: [
      "No credible source cited",
      "Fear / urgency language",
      "Contradicts official information",
    ],
    explanation:
      "This message makes a strong claim without verifiable evidence and uses urgency-driven wording that may encourage panic and rapid resharing.",
    sources: [
      {
        title: "MOH Advisory",
        description: "Official statement from Ministry of Health",
        url: "#",
      },
      {
        title: "CNA Article",
        description: "Latest update on the reported situation",
        url: "#",
      },
    ],
    viralityRisk: "High",
    viralityReasons: [
      "Uses fear-based language",
      "Claims hidden or insider information",
      "Encourages rapid sharing",
    ],
  },

  uncertain: {
    classification: "Uncertain",
    confidence: 61,
    signals: [
      "Claim lacks enough supporting evidence",
      "Source authority is unclear",
      "Context may be incomplete",
    ],
    explanation:
      "This message contains claims that are not clearly supported or contradicted by trusted sources. More evidence is needed before it can be assessed confidently.",
    sources: [
      {
        title: "Gov.sg",
        description: "Official government updates and advisories",
        url: "#",
      },
      {
        title: "Straits Times",
        description: "Related local coverage",
        url: "#",
      },
    ],
    viralityRisk: "Medium",
    viralityReasons: [
      "Ambiguous wording",
      "May be reshared without verification",
      "Lacks context",
    ],
  },

  accurate: {
    classification: "Likely Accurate",
    confidence: 86,
    signals: [
      "Claim aligns with trusted sources",
      "Information is consistent with official advisory",
      "Low manipulation language detected",
    ],
    explanation:
      "This message is consistent with information found in trusted and relevant sources, and does not show strong signs of misleading or manipulative phrasing.",
    sources: [
      {
        title: "WHO Guidance",
        description: "Relevant international health guidance",
        url: "#",
      },
      {
        title: "MOH Advisory",
        description: "Official local update",
        url: "#",
      },
    ],
    viralityRisk: "Low",
    viralityReasons: [
      "Neutral language",
      "Does not pressure resharing",
      "Contains verifiable context",
    ],
  },
};