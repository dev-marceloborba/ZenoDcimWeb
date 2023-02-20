import { ColumnHeader } from "../DataTable";

export default function generateCSV(data: any[], headers: ColumnHeader[]) {
  return new Promise((resolve) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.map((header) => header.label).join(",") +
      "\n" +
      data
        .map((item) =>
          headers
            .map((header) => {
              const value = item[header.name];
              return typeof value === "string"
                ? '"' + value.replace(/"/g, '""') + '"'
                : value;
            })
            .join(",")
        )
        .join("\n");

    resolve(encodeURI(csvContent));
  });
}
