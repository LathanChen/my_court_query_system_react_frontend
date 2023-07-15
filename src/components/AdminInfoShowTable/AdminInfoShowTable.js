import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 8, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 9, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 10, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 11, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 12, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function AdminInfoShowTable(props) {
  const showSelected = (data) =>{
    setSeletedDatas(data)
    props.isBatchselectionChange(data)
  }

  const [seletedDatas,setSeletedDatas] = React.useState([])

  return (
    <div style={{ 
        height: '85vh',
        marginTop:'3vh'
        }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={showSelected}
      />
    </div>
  );
}