const shortMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const OverviewList = [
  "format",
  "duration",
  "status",
  "startDate",
  "season",
  "averageScore",
  "meanScore",
  "popularity",
  "favourites",
  "source",
  "genres",
  "title",
  "synonyms",
];

export const convertCamel2Title = (label: string): string => {
  const result = label.toLowerCase().replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export function OverviewFormat(keyValue: string, data: any): any {
  if (keyValue === "format") return <span key={`overview_${keyValue}`}>{data}</span>;
  if (keyValue === "duration") return <span key={`overview_${keyValue}`}>{`${data} mins`}</span>;
  if (keyValue === "startDate")
    return (
      <span key={`overview_${keyValue}`}>
        {data.month ? `${shortMonth[data.month - 1]} ` : ""}
        {data.day ? `${data.day}` : ""}
        {(data.day || data.month) && data.year ? "," : ""}
        {data.year ? `${data.year}` : ""}
      </span>
    );
  if (keyValue === "averageScore" || keyValue === "meanScore")
    return <span key={`overview_${keyValue}`}>{`${data}%`}</span>;
  if (keyValue === "genres" || keyValue === "synonyms") {
    if (data)
      return data.map((item: string, index: string) =>
        typeof item === "string" ? (
          <span key={`${keyValue}_${index}`}>{convertCamel2Title(item)}</span>
        ) : (
          <span></span>
        )
      );
    return <span key={`overview_${keyValue}`}></span>;
  }
  if (keyValue === "title") {
    return Object.entries(data).map(([keyValue, value], index) =>
      keyValue !== "__typename" ? (
        <span key={`title_${index}`}>{`${value}`}</span>
      ) : (
        <span key={`overview_${keyValue}`}></span>
      )
    );
  }
  return <span key={`overview_${keyValue}`}>{convertCamel2Title(`${data}`)}</span>;
}
