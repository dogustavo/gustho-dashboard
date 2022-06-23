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

//TODO IFILTER GLOBAL
interface IFilter {
  page: number
  limit: number
  search: string
}
interface ITable {
  data: any[]
  rows: IRows[]
  paginate: IPagination
  setFilter: (props: IFilter) => void
  filter: IFilter
}

interface IRows {
  header: string
  acessor: string
}

interface IPagination {
  page: number
  rowsPerPage: number
  count: number
}

export default function TableComponent({
  data,
  rows,
  setFilter,
  paginate
}: ITable) {
  const handlePaginate = (newPage: number) =>
    setFilter((value: any) => ({ ...value, page: newPage + 1 }))

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
              count={paginate.count}
              page={paginate.page - 1}
              rowsPerPage={10}
              rowsPerPageOptions={[]}
              onPageChange={handlePaginate}
              labelDisplayedRows={(props) => {
                return `${props.to} itens de ${props.count}`
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
