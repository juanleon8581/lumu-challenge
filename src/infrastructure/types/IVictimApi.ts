export interface IVictimAPI {
  activity: string;
  attackdate: string;
  claim_url: string;
  country: string;
  description: string;
  discovered: string;
  domain: string;
  duplicates: Duplicate[];
  extrainfos: string[] | ExtrainfosClass;
  group: string;
  infostealer?: InfostealerClass | string;
  press?: Press | null;
  screenshot: string;
  url: string;
  victim: string;
  modifications?: Modification[];
}

export interface Duplicate {
  attackdate: string;
  date: string;
  group: string;
  link: string;
}

export interface ExtrainfosClass {
  ransom?: number | string;
  data_size?: string;
}

export interface InfostealerClass {
  employees: number;
  employees_url: number;
  infostealer_stats?: InfostealerStats;
  thirdparties: number;
  thirdparties_domain?: number;
  update: Date;
  users: number;
  users_url: number;
}

export interface InfostealerStats {
  StealC?: number;
  Azorult?: number;
  Lumma?: number;
  Mystic?: number;
  Raccoon?: number;
  RedLine?: number;
  UNKNOWN?: number;
  Vidar?: number;
  Taurus?: number;
}

export interface Modification {
  date: Date;
  description: string;
}

export interface Press {
  link: string;
  source: string;
  summary: string;
}
