import React, { useMemo } from 'react';
import { TableHead, TableRow } from '../ui/table';
import { AnimatePresence, motion } from 'framer-motion';

type GenericTableProps<T> = {
  headers: string[];
  data: T[];
  dataAccessors: (keyof T)[];
  children?: React.ReactNode;
  renderHeader?: (header: string, index: number) => React.ReactNode;
  renderCell?: (item: T, accessor: keyof T, rowIndex: number, cellIndex: number) => React.ReactNode;
};

const tableRowVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

function GenericTable<T>({ headers, data, dataAccessors, renderHeader, renderCell, children }: GenericTableProps<T>) {
  const tableBody = useMemo(() => {
    if (children) return children;
    if (!data || !dataAccessors) return null;

    if (data.length === 0) {
      return (
        <motion.tr
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          variants={tableRowVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-4 text-center text-2xl text-gray-600"
        >
          <motion.td colSpan={dataAccessors.length}>No data</motion.td>
        </motion.tr>
      );
    }

    return data.map((item, rowIndex) => (
      <motion.tr
        key={rowIndex}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        variants={tableRowVariants}
        transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      >
        {dataAccessors.map((accessor, cellIndex) => (
          <motion.td
            className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
            key={cellIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {renderCell ? renderCell(item, accessor, rowIndex, cellIndex) : String(item[accessor])}
          </motion.td>
        ))}
      </motion.tr>
    ));
  }, [children, data, dataAccessors]);

  return (
    <table className="w-full">
      <thead>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{renderHeader ? renderHeader(header, index) : header}</TableHead>
          ))}
        </TableRow>
      </thead>
      <tbody>
        <AnimatePresence>{tableBody}</AnimatePresence>
      </tbody>
    </table>
  );
}

export default GenericTable;
