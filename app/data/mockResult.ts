export type SourceType = "Official" | "Verified" | "News" | "Community";

export type Source = {
  title: string;
  description: string;
  url: string;
  type: SourceType;
};

export type AnalysisResult = {
  classification: "Likely Accurate" | "Uncertain" | "Potentially Misleading";
  confidence: number;
  explanation: string;
  signals: string[];
  sources: Source[];

  evidenceStrength: "Strong" | "Moderate" | "Weak";
  evidenceSummary: string;

  uncertainties: string[];
  missingContext: string[];

  detectedLanguages: string[];
  simplifiedSummary: string;
  localContext: string;

  recommendedActions: string[];

  viralityRisk: "Low" | "Medium" | "High";
  viralityReasons: string[];
};

export const mockResults: Record<string, AnalysisResult> = {
  accurate: {
    classification: "Likely Accurate",
    confidence: 86,
    explanation:
      "This message is consistent with information found in trusted and relevant sources, and does not show strong signs of manipulation or panic-inducing phrasing.",
    signals: [
      "Claim aligns with trusted sources",
      "Information is consistent with official advisory",
      "Low manipulation language detected",
    ],
    sources: [
      {
        title: "WHO Guidance",
        description: "Relevant international health guidance",
        url: "https://www.who.int",
        type: "Official",
      },
      {
        title: "MOH Advisory",
        description: "Official local update from Singapore health authority",
        url: "https://www.moh.gov.sg",
        type: "Official",
      },
    ],
    evidenceStrength: "Strong",
    evidenceSummary:
      "Multiple official and relevant sources support the core claim, and the message wording stays close to verifiable public information.",
    uncertainties: [
      "The message may still simplify some details compared to the full advisory.",
    ],
    missingContext: [
      "No publication date is included in the forwarded text.",
      "Original source link is not attached in the message itself.",
    ],
    detectedLanguages: ["English"],
    simplifiedSummary:
      "The message shares health information that broadly matches trusted guidance and does not strongly pressure people to reshare it.",
    localContext:
      "Because the message refers to public health information, Singapore official sources such as MOH are especially relevant for local verification.",
    recommendedActions: [
      "Cross-check the claim against the latest official advisory.",
      "Verify that the message date is still current before resharing.",
      "Share the original source link instead of only forwarding copied text.",
    ],
    viralityRisk: "Low",
    viralityReasons: [
      "Neutral language",
      "Does not pressure resharing",
      "Contains verifiable context",
    ],
  },

  uncertain: {
    classification: "Uncertain",
    confidence: 61,
    explanation:
      "Some parts of the message may be plausible, but the content lacks enough supporting evidence to verify it with confidence. The wording suggests uncertainty and the source is not clearly established.",
    signals: [
      "Unverified or vague source reference",
      "Hedging language such as 'might' or 'maybe'",
      "Limited supporting evidence found",
    ],
    sources: [
      {
        title: "MOH Newsroom",
        description: "Official updates that may help verify the claim",
        url: "https://www.moh.gov.sg/newsroom",
        type: "Official",
      },
      {
        title: "Gov.sg Factually",
        description: "Singapore government clarification portal",
        url: "https://www.gov.sg",
        type: "Verified",
      },
    ],
    evidenceStrength: "Moderate",
    evidenceSummary:
      "Some related information exists, but the exact claim in the message is not fully supported by clear official evidence.",
    uncertainties: [
      "The original source of the claim is unclear.",
      "The exact event or statement mentioned cannot be independently verified yet.",
      "Some wording is too vague to confirm precisely.",
    ],
    missingContext: [
      "No exact date or timeline is given.",
      "No direct source link is included.",
      "The location or affected group may not be clearly stated.",
    ],
    detectedLanguages: ["English"],
    simplifiedSummary:
      "The message makes a claim that may be partly true, but there is not enough evidence to verify the full statement confidently.",
    localContext:
      "If the message refers to Singapore services, users should compare it with current MOH, Gov.sg, or agency advisories rather than relying on forwarded wording alone.",
    recommendedActions: [
      "Do not reshare until the source is confirmed.",
      "Look for an official advisory or statement with the same claim.",
      "Check whether the message is outdated or missing context.",
    ],
    viralityRisk: "Medium",
    viralityReasons: [
      "Contains ambiguity that may confuse readers",
      "Could spread quickly if interpreted as urgent",
      "Not enough context for safe resharing",
    ],
  },

  misleading: {
    classification: "Potentially Misleading",
    confidence: 91,
    explanation:
      "This message shows multiple risk signals associated with misinformation, including urgency, unverified authority claims, and pressure to reshare. Trusted sources do not clearly support the exact claim presented.",
    signals: [
      "Uses panic or urgency-driven language",
      "Encourages mass resharing",
      "Claims secret confirmation without evidence",
      "Mismatch with trusted source wording",
    ],
    sources: [
      {
        title: "MOH Singapore",
        description: "Official health advisories and latest updates",
        url: "https://www.moh.gov.sg",
        type: "Official",
      },
      {
        title: "WHO Mythbusters",
        description: "Verified resource for misleading public health claims",
        url: "https://www.who.int",
        type: "Official",
      },
      {
        title: "Gov.sg Factually",
        description: "Official clarification portal for misinformation",
        url: "https://www.gov.sg",
        type: "Verified",
      },
    ],
    evidenceStrength: "Weak",
    evidenceSummary:
      "The message makes strong claims, but the evidence presented is weak or absent, and trusted sources do not support the exact wording.",
    uncertainties: [
      "The claimed 'secret confirmation' cannot be verified.",
      "The message does not identify who made the statement or when.",
      "The severity of the claim is not supported by visible evidence.",
    ],
    missingContext: [
      "No original source document is provided.",
      "No date, author, or traceable origin is included.",
      "The message may omit important official context or updates.",
    ],
    detectedLanguages: ["English"],
    simplifiedSummary:
      "The message uses alarming language and asks people to spread it, but there is no strong evidence that the exact claim is true.",
    localContext:
      "For Singapore-related public safety or health claims, local official advisories should be checked first because forwarded messages often remove timing and policy context.",
    recommendedActions: [
      "Do not forward the message yet.",
      "Check the latest official advisory directly.",
      "Look for the original statement and date before trusting the claim.",
      "Share verified links instead of screenshots or copied text.",
    ],
    viralityRisk: "High",
    viralityReasons: [
      "Panic-inducing language",
      "Pressures immediate resharing",
      "May cause confusion or harm if false",
    ],
  },
};