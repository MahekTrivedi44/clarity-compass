// CIS-FI Dummy Data for Demonstration
// All data is synthetic but realistic for insurance claim reconciliation

export interface Document {
  id: string;
  name: string;
  type: 'claim_statement' | 'adjuster_report' | 'invoice' | 'photo' | 'supporting';
  source: string;
  author: string;
  date: string;
  size: string;
  status: 'processed' | 'processing' | 'pending';
}

export interface Claim {
  claim_id: string;
  content: string;
  category: 'Damage' | 'Timeline' | 'Location' | 'Cost' | 'Liability' | 'Witness';
  source: string;
  attribution: string;
  temporal_reference: string | null;
  entities: string[];
  confidence: number;
}

export interface ConflictRelation {
  id: string;
  claim_a_id: string;
  claim_b_id: string;
  type: 'contradiction' | 'partial_conflict' | 'supports' | 'ambiguous';
  severity: 'high' | 'medium' | 'low';
  description: string;
  confidence: number;
}

export interface ConsensusCluster {
  id: string;
  claims: string[];
  summary: string;
  sources_agreeing: string[];
  confidence: number;
}

export interface ResolutionQuestion {
  id: string;
  question: string;
  context: string;
  related_claims: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
}

// Sample Insurance Claim Case: Vehicle Collision
export const caseInfo = {
  case_id: "INS-2025-001247",
  case_name: "Vehicle Collision Claim - Highway 101",
  claimant: "Robert J. Mitchell",
  policy_number: "AUTO-7829461",
  date_of_incident: "2025-01-12",
  date_filed: "2025-01-13",
  status: "Under Review",
  total_claimed: 18750.00,
};

export const documents: Document[] = [
  {
    id: "DOC-001",
    name: "Claimant Statement - R. Mitchell",
    type: "claim_statement",
    source: "Policyholder",
    author: "Robert J. Mitchell",
    date: "2025-01-13",
    size: "2.4 MB",
    status: "processed",
  },
  {
    id: "DOC-002",
    name: "Adjuster Field Report",
    type: "adjuster_report",
    source: "Insurance Adjuster",
    author: "Sarah Chen, Senior Adjuster",
    date: "2025-01-15",
    size: "4.1 MB",
    status: "processed",
  },
  {
    id: "DOC-003",
    name: "AutoBody Pro Repair Estimate",
    type: "invoice",
    source: "Repair Shop",
    author: "AutoBody Pro Inc.",
    date: "2025-01-14",
    size: "1.8 MB",
    status: "processed",
  },
  {
    id: "DOC-004",
    name: "Traffic Camera Footage Report",
    type: "supporting",
    source: "City Traffic Authority",
    author: "DOT Records Dept.",
    date: "2025-01-16",
    size: "856 KB",
    status: "processed",
  },
  {
    id: "DOC-005",
    name: "Witness Statement - J. Parker",
    type: "supporting",
    source: "Third Party Witness",
    author: "James Parker",
    date: "2025-01-14",
    size: "412 KB",
    status: "processed",
  },
];

export const claims: Claim[] = [
  // Claimant's Claims
  {
    claim_id: "CLM-001",
    content: "Vehicle was struck from behind while stationary at red light",
    category: "Liability",
    source: "Claimant Statement",
    attribution: "Robert J. Mitchell",
    temporal_reference: "2025-01-12T18:30:00",
    entities: ["Vehicle", "Red Light", "Rear Collision"],
    confidence: 0.92,
  },
  {
    claim_id: "CLM-002",
    content: "Incident occurred at 6:30 PM at Highway 101 and Oak Street intersection",
    category: "Timeline",
    source: "Claimant Statement",
    attribution: "Robert J. Mitchell",
    temporal_reference: "2025-01-12T18:30:00",
    entities: ["Highway 101", "Oak Street", "Intersection"],
    confidence: 0.88,
  },
  {
    claim_id: "CLM-003",
    content: "Rear bumper and trunk sustained severe damage",
    category: "Damage",
    source: "Claimant Statement",
    attribution: "Robert J. Mitchell",
    temporal_reference: null,
    entities: ["Rear Bumper", "Trunk", "Severe Damage"],
    confidence: 0.85,
  },
  {
    claim_id: "CLM-004",
    content: "Estimated repair cost of $12,500",
    category: "Cost",
    source: "Claimant Statement",
    attribution: "Robert J. Mitchell",
    temporal_reference: null,
    entities: ["$12,500", "Repair Cost"],
    confidence: 0.75,
  },

  // Adjuster's Claims
  {
    claim_id: "CLM-005",
    content: "Damage consistent with rear-end collision at moderate speed",
    category: "Damage",
    source: "Adjuster Report",
    attribution: "Sarah Chen",
    temporal_reference: null,
    entities: ["Rear-end Collision", "Moderate Speed"],
    confidence: 0.94,
  },
  {
    claim_id: "CLM-006",
    content: "Incident time estimated between 6:15 PM and 6:45 PM based on evidence",
    category: "Timeline",
    source: "Adjuster Report",
    attribution: "Sarah Chen",
    temporal_reference: "2025-01-12T18:30:00",
    entities: ["Time Range", "Evidence-based"],
    confidence: 0.82,
  },
  {
    claim_id: "CLM-007",
    content: "Left rear quarter panel also shows impact damage",
    category: "Damage",
    source: "Adjuster Report",
    attribution: "Sarah Chen",
    temporal_reference: null,
    entities: ["Left Rear Quarter Panel", "Impact Damage"],
    confidence: 0.91,
  },
  {
    claim_id: "CLM-008",
    content: "Pre-existing minor scratches observed on right side, unrelated to claim",
    category: "Damage",
    source: "Adjuster Report",
    attribution: "Sarah Chen",
    temporal_reference: null,
    entities: ["Pre-existing Damage", "Right Side", "Scratches"],
    confidence: 0.89,
  },

  // Repair Shop Claims
  {
    claim_id: "CLM-009",
    content: "Total repair estimate: $18,750 including parts and labor",
    category: "Cost",
    source: "Repair Invoice",
    attribution: "AutoBody Pro Inc.",
    temporal_reference: null,
    entities: ["$18,750", "Parts", "Labor"],
    confidence: 0.97,
  },
  {
    claim_id: "CLM-010",
    content: "Bumper replacement required - cannot be repaired",
    category: "Damage",
    source: "Repair Invoice",
    attribution: "AutoBody Pro Inc.",
    temporal_reference: null,
    entities: ["Bumper Replacement", "Irreparable"],
    confidence: 0.95,
  },
  {
    claim_id: "CLM-011",
    content: "Frame alignment check recommended due to impact severity",
    category: "Damage",
    source: "Repair Invoice",
    attribution: "AutoBody Pro Inc.",
    temporal_reference: null,
    entities: ["Frame Alignment", "Impact Severity"],
    confidence: 0.88,
  },

  // Traffic Camera Report
  {
    claim_id: "CLM-012",
    content: "Camera footage shows collision at 6:27 PM",
    category: "Timeline",
    source: "Traffic Authority",
    attribution: "DOT Records",
    temporal_reference: "2025-01-12T18:27:00",
    entities: ["6:27 PM", "Camera Footage", "Verified Time"],
    confidence: 0.99,
  },
  {
    claim_id: "CLM-013",
    content: "Vehicle was moving slowly, approximately 5 mph, at time of impact",
    category: "Liability",
    source: "Traffic Authority",
    attribution: "DOT Records",
    temporal_reference: "2025-01-12T18:27:00",
    entities: ["5 mph", "Moving", "Impact"],
    confidence: 0.96,
  },

  // Witness Statement
  {
    claim_id: "CLM-014",
    content: "Saw the blue sedan rear-end the claimant's vehicle",
    category: "Witness",
    source: "Witness Statement",
    attribution: "James Parker",
    temporal_reference: "2025-01-12T18:30:00",
    entities: ["Blue Sedan", "Rear-end", "Claimant Vehicle"],
    confidence: 0.78,
  },
  {
    claim_id: "CLM-015",
    content: "Claimant's vehicle was stopped at the intersection when hit",
    category: "Liability",
    source: "Witness Statement",
    attribution: "James Parker",
    temporal_reference: null,
    entities: ["Stopped", "Intersection"],
    confidence: 0.82,
  },
];

export const conflictRelations: ConflictRelation[] = [
  {
    id: "REL-001",
    claim_a_id: "CLM-001",
    claim_b_id: "CLM-013",
    type: "contradiction",
    severity: "high",
    description: "Claimant states vehicle was stationary, but traffic camera shows vehicle moving at 5 mph",
    confidence: 0.94,
  },
  {
    id: "REL-002",
    claim_a_id: "CLM-004",
    claim_b_id: "CLM-009",
    type: "contradiction",
    severity: "high",
    description: "Claimant estimates $12,500 repair cost, but repair shop quotes $18,750 - a $6,250 discrepancy",
    confidence: 0.97,
  },
  {
    id: "REL-003",
    claim_a_id: "CLM-002",
    claim_b_id: "CLM-012",
    type: "partial_conflict",
    severity: "low",
    description: "Claimant reported 6:30 PM, traffic camera shows 6:27 PM - 3 minute discrepancy",
    confidence: 0.89,
  },
  {
    id: "REL-004",
    claim_a_id: "CLM-003",
    claim_b_id: "CLM-007",
    type: "partial_conflict",
    severity: "medium",
    description: "Claimant mentions rear bumper and trunk, adjuster also found left quarter panel damage not mentioned by claimant",
    confidence: 0.85,
  },
  {
    id: "REL-005",
    claim_a_id: "CLM-001",
    claim_b_id: "CLM-015",
    type: "supports",
    severity: "low",
    description: "Witness corroborates claimant's account that vehicle was stopped",
    confidence: 0.80,
  },
  {
    id: "REL-006",
    claim_a_id: "CLM-005",
    claim_b_id: "CLM-010",
    type: "supports",
    severity: "low",
    description: "Adjuster and repair shop agree on collision severity requiring bumper replacement",
    confidence: 0.92,
  },
  {
    id: "REL-007",
    claim_a_id: "CLM-015",
    claim_b_id: "CLM-013",
    type: "contradiction",
    severity: "medium",
    description: "Witness states vehicle was stopped, but camera shows it was moving at 5 mph",
    confidence: 0.88,
  },
];

export const consensusClusters: ConsensusCluster[] = [
  {
    id: "CON-001",
    claims: ["CLM-002", "CLM-006", "CLM-012"],
    summary: "All sources agree the incident occurred on January 12, 2025, around 6:30 PM (±3 minutes)",
    sources_agreeing: ["Claimant", "Adjuster", "Traffic Authority"],
    confidence: 0.91,
  },
  {
    id: "CON-002",
    claims: ["CLM-003", "CLM-005", "CLM-007", "CLM-010", "CLM-011"],
    summary: "All sources confirm significant rear-end damage requiring major repairs",
    sources_agreeing: ["Claimant", "Adjuster", "Repair Shop"],
    confidence: 0.94,
  },
  {
    id: "CON-003",
    claims: ["CLM-001", "CLM-014", "CLM-015"],
    summary: "Claimant and witness agree the incident was a rear-end collision",
    sources_agreeing: ["Claimant", "Witness"],
    confidence: 0.85,
  },
];

export const resolutionQuestions: ResolutionQuestion[] = [
  {
    id: "RQ-001",
    question: "Was the claimant's vehicle completely stationary or moving slowly at the time of impact?",
    context: "Traffic camera shows 5 mph movement, contradicting claimant's statement of being stationary. This affects liability determination.",
    related_claims: ["CLM-001", "CLM-013", "CLM-015"],
    priority: "critical",
    category: "Liability Verification",
  },
  {
    id: "RQ-002",
    question: "Why is there a $6,250 discrepancy between claimant's estimate and repair shop quote?",
    context: "Claimant estimated $12,500, repair shop quotes $18,750. Need to determine if additional damage was discovered or if original estimate was incomplete.",
    related_claims: ["CLM-004", "CLM-009"],
    priority: "high",
    category: "Cost Verification",
  },
  {
    id: "RQ-003",
    question: "Was the left rear quarter panel damage caused by this incident or pre-existing?",
    context: "Adjuster noted left quarter panel damage, but claimant only mentioned rear bumper and trunk. Pre-existing right-side scratches were already identified.",
    related_claims: ["CLM-003", "CLM-007", "CLM-008"],
    priority: "high",
    category: "Damage Verification",
  },
  {
    id: "RQ-004",
    question: "Can witness provide more specific details about vehicle movement at time of collision?",
    context: "Witness statement supports claimant but conflicts with camera evidence. Witness may have additional observations.",
    related_claims: ["CLM-014", "CLM-015", "CLM-013"],
    priority: "medium",
    category: "Witness Clarification",
  },
  {
    id: "RQ-005",
    question: "Is frame alignment check result available to justify the $18,750 total?",
    context: "Repair shop recommends frame check. If frame damage exists, higher cost may be justified.",
    related_claims: ["CLM-009", "CLM-011"],
    priority: "medium",
    category: "Cost Justification",
  },
];

export const uncertaintyMetrics = {
  overall_confidence: 0.72,
  uncertainty_level: "Medium-High",
  risk_flag: "Review Required",
  key_uncertainties: [
    {
      area: "Vehicle Motion Status",
      score: 0.45,
      description: "Conflicting evidence on whether vehicle was stationary or moving",
    },
    {
      area: "Repair Cost Accuracy",
      score: 0.58,
      description: "Significant discrepancy between estimated and quoted repair costs",
    },
    {
      area: "Damage Scope",
      score: 0.78,
      description: "Generally consistent damage reports with minor discrepancies",
    },
    {
      area: "Timeline Accuracy",
      score: 0.91,
      description: "High agreement on incident timing across sources",
    },
  ],
};

export const sourceCredibility = [
  { source: "Traffic Authority", credibility: 0.98, bias_risk: "Very Low", reliability: "Official Record" },
  { source: "Insurance Adjuster", credibility: 0.92, bias_risk: "Low", reliability: "Professional Assessment" },
  { source: "Repair Shop", credibility: 0.88, bias_risk: "Medium", reliability: "Commercial Interest" },
  { source: "Claimant", credibility: 0.75, bias_risk: "High", reliability: "Direct Interest" },
  { source: "Witness", credibility: 0.72, bias_risk: "Medium", reliability: "Bystander Observation" },
];

// Graph data for visualization
export const graphNodes = claims.map((claim) => ({
  id: claim.claim_id,
  label: claim.content.substring(0, 40) + "...",
  category: claim.category,
  source: claim.source,
  confidence: claim.confidence,
  type: "claim" as const,
}));

export const graphEdges = conflictRelations.map((rel) => ({
  id: rel.id,
  source: rel.claim_a_id,
  target: rel.claim_b_id,
  type: rel.type,
  severity: rel.severity,
  label: rel.description.substring(0, 30) + "...",
}));

// Cross-reference matrix data
export const crossReferenceMatrix = {
  dimensions: ["Claimant", "Adjuster", "Repair Shop", "Traffic Auth", "Witness"],
  categories: ["Damage Location", "Incident Time", "Cost Estimate", "Vehicle Status", "Impact Severity"],
  data: [
    // Damage Location
    ["Rear bumper, trunk", "Rear + left quarter", "Bumper, frame", "N/A", "N/A"],
    // Incident Time
    ["6:30 PM", "6:15-6:45 PM", "N/A", "6:27 PM", "~6:30 PM"],
    // Cost Estimate
    ["$12,500", "N/A", "$18,750", "N/A", "N/A"],
    // Vehicle Status
    ["Stationary", "N/A", "N/A", "Moving 5mph", "Stopped"],
    // Impact Severity
    ["Severe", "Moderate", "Major", "N/A", "N/A"],
  ],
  conflicts: [
    [false, true, false, false, false],
    [false, false, false, true, false],
    [false, false, true, false, false],
    [false, false, false, true, true],
    [false, true, false, false, false],
  ],
};
