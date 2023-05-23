export const transformDate = (stringDate: string) => {
  //  Convert a "dd/MM/yyyy" string into a Date object
  let toBeConvertedDate = stringDate.split("/");
  let formatedDate = new Date(
    toBeConvertedDate[2] +
      "/" +
      toBeConvertedDate[1] +
      "/" +
      toBeConvertedDate[0]
  );
  return formatedDate;
};

export function formatDate(dataString: string): string {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString();
  return `${dia}/${mes}/${ano}`;
}

export function getFirstAndLastDaysFromDate(date: Date) {
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  var firstDayFormated = firstDay.toISOString().slice(0, 10);
  var lastDayFormated = lastDay.toISOString().slice(0, 10);

  return {
    firstDay: firstDayFormated,
    lastDay: lastDayFormated,
  };
}
