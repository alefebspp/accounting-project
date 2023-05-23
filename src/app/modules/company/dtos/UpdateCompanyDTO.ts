export interface UpdateCompanyRequestDTO {
  cnpj?: string;
  corporate_name?: string;
  fantasy_name?: string;
  primary_cnae?: string;
  primary_cnae_description?: string;
  foundation_date?: Date;
  status?: string;
  balance?: number;
}
