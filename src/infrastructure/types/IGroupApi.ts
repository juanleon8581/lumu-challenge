export interface IGroupAPI {
  description: string;
  locations: Location[];
  meta: null;
  name: string;
  parser: boolean;
  profile: string[];
  tools: string[];
  ttps: Ttp[];
  url: string;
}

export interface Location {
  available: boolean;
  enabled: boolean;
  fqdn: string;
  lastscrape: Date;
  slug: string;
  title: null | string;
  type: string;
  updated: Date;
}

export interface Ttp {
  tactic_id: string;
  tactic_name: string;
  techniques: Technique[];
}

export interface Technique {
  technique_details: string;
  technique_id: string;
  technique_name: string;
}
