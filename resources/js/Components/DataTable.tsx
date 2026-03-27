import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Pagination,
  Typography,
  TableFooter,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * Definición de columna genérica
 */
export interface Column<T> {
  field: keyof T;
  headerName: string;
  align?: "left" | "right" | "center";
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

/**
 * Props del componente
 */
interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowId?: (row: T) => string | number;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  actions?: boolean;
}

/**
 * Componente genérico
 */
function DataTable<T>({
  columns,
  rows,
  getRowId,
  onEdit,
  onDelete,
  actions = true,
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={String(col.field)} align={col.align || "left"}>
                {col.headerName}
              </TableCell>
            ))}
            {actions && <TableCell align="center">Acciones</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => {
            const rowId = getRowId
              ? getRowId(row)
              : (row as any).id || index;

            return (
              <TableRow key={rowId}>
                {columns.map((col) => {
                  const value = row[col.field];

                  return (
                    <TableCell
                      key={String(col.field)}
                      align={col.align || "left"}
                    >
                      {col.render
                        ? col.render(value, row)
                        : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}

                {actions && (
                  <TableCell 
                  align="center"
                 
                  >
                    {onEdit && (
                      <Tooltip title="Editar">
                        <IconButton onClick={() => onEdit(row)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    {onDelete && (
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => onDelete(row)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell 
            align="center"
             colSpan={3}>
               <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
         <TableFooter>
          <TableRow>
            
            </TableRow>
            </TableFooter>
      </Table>
      
    </TableContainer>
  );
}

export default DataTable;