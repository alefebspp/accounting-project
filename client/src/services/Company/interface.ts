export interface Company {
  id: string;
  cnpj: string;
  corporate_name: string;
  fantasy_name: string;
  primary_cnae: string;
  primary_cnae_description: string;
  foundation_date: string;
  status: string;
  balance?: number;
}

export interface UpdateCompanyRequest {
  cnpj?: string;
  corporate_name?: string;
  fantasy_name?: string;
  primary_cnae?: string;
  primary_cnae_description?: string;
  foundation_date?: string;
  status?: string;
  balance?: number;
}
