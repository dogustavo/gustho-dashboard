// import { DataG} from '@mui/material'

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter
} from '@mui/material'

interface ITable {
  data: any[]
  rows: IRows[]
  paginate: IPagination
}

interface IRows {
  header: string
  acessor: string
}

interface IPagination {
  page: number
  rowsPerPage: number
}

export default function TableComponent({
  data,
  rows,
  paginate
}: ITable) {
  const handlePaginate = () => alert('teset')

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {rows.map((row, id) => (
              <TableCell key={id}>{row.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, id) => (
            <TableRow key={id}>
              {rows.map((row, id) => (
                <TableCell key={id}>{item[row.acessor]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              count={15}
              onPageChange={handlePaginate}
              page={paginate.page}
              rowsPerPage={paginate.rowsPerPage}
              labelRowsPerPage={<span>Listar:</span>}
              labelDisplayedRows={({ page, to }) => {
                return `${page} - ${to}`
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
