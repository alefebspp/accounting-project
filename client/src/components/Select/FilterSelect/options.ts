const actualDate = new Date();
const actualYear = actualDate.getFullYear();

export const dateSelectOptions = [
  { label: `${actualYear}`, value: "reset" },
  { label: `Janeiro/${actualYear}`, value: `${actualYear}/01/01` },
  { label: `Fevereiro/${actualYear}`, value: `${actualYear}/02/01` },
  { label: `Março/${actualYear}`, value: `${actualYear}/03/01` },
  { label: `Abril/${actualYear}`, value: `${actualYear}/04/01` },
  { label: `Maio/${actualYear}`, value: `${actualYear}/05/01` },
  { label: `Junho/${actualYear}`, value: `${actualYear}/06/01` },
  { label: `Julho/${actualYear}`, value: `${actualYear}/07/01` },
  { label: `Agosto/${actualYear}`, value: `${actualYear}/08/01` },
  { label: `Setembro/${actualYear}`, value: `${actualYear}/09/01` },
  { label: `Outubro/${actualYear}`, value: `${actualYear}/10/01` },
  { label: `Novembro/${actualYear}`, value: `${actualYear}/11/01` },
  { label: `Dezembro/${actualYear}`, value: `${actualYear}/12/01` },
];

export const paymentOptions = [
  {
    label: "Todos os códigos",
    value: "reset",
  },
  {
    label: "643 -	CAIXA",
    value: "643",
  },
  {
    label: "645 - CAIXA",
    value: "645",
  },
  {
    label: "644 - BANCOS CONTA MOVIMENTO",
    value: "644",
  },
  {
    label: "5 - BRADESCO C/C",
    value: "5",
  },
  {
    label: "6 - BANCO DO BRASIL S/A",
    value: "6",
  },
  {
    label: "7 - CAIXA ECONÔMICA FEDERAL S/A",
    value: "7",
  },
  {
    label: "633 - SANTANDER",
    value: "633",
  },
  {
    label: "634 - BANCO ITAÚ",
    value: "634",
  },
  {
    label: "636 - BANCO HSBC",
    value: "636",
  },
  {
    label: "635 - BRADESCO C/P",
    value: "635",
  },
  {
    label: "9 - BANCO DO BRASIL",
    value: "9",
  },
  {
    label: "647 - SANTANDER",
    value: "647",
  },
  {
    label: "648 - CAIXA ECONÔMICA FEDERAL",
    value: "648",
  },
  {
    label: "679 - BANCO DO BRASIL S/A",
    value: "679",
  },
  {
    label: "680 - CAIXA ECONÔMICA FEDERAL",
    value: "680",
  },
  {
    label: "682 - BANCO ITAÚ",
    value: "682",
  },
  {
    label: "681 - SANTANDER",
    value: "681",
  },
  {
    label: "683 -	BRADESCO",
    value: "683",
  },
  {
    label: "52 -	BANCO DO BRASIL S/A",
    value: "52",
  },
  {
    label: "122 - CAIXA ECONÔMICA FEDERAL",
    value: "122",
  },
  {
    label: "123 - BRADESCO",
    value: "123",
  },
  {
    label: "124 - SANTANDER",
    value: "124",
  },
  {
    label: "125 - BANCO ITAÚ",
    value: "125",
  },
];
