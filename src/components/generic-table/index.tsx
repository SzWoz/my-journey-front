import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

type GenericTableProps<T> =
  | {
      headers: string[];
      data: T[];
      dataAccessors: (keyof T)[];
      children?: undefined;
    }
  | {
      headers: string[];
      data?: undefined;
      dataAccessors?: undefined;
      children: React.ReactNode;
    };

function GenericTable<T>({ headers, data, dataAccessors, children }: GenericTableProps<T>) {
  const tableBody = useMemo(() => {
    if (children) return children;
    if (!data || !dataAccessors) return null;

    return data.map((item, rowIndex) => (
      <TableRow key={rowIndex}>
        {dataAccessors.map((accessor, cellIndex) => (
          <TableCell key={cellIndex}>{String(item[accessor])}</TableCell>
        ))}
      </TableRow>
    ));
  }, [children, data, dataAccessors]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{tableBody}</TableBody>
    </Table>
  );
}

export default GenericTable;
