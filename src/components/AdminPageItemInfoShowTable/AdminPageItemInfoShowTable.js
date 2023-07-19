import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const columns = [
  { field: 'courtOpenInfoId', headerName: '编号', width: 70 },
  { field: 'itemInfoName', headerName: '项目', width: 130 },
  { field: 'courtOpenTimeZone', headerName: '时间段', width: 200 },
  {field: 'courtOpenTime',headerName: '起始时间',width: 200},
  {field: 'courtName',headerName: '场地',width: 200},
  {
    field: 'actions',
    headerName: '操作',
    width: 200,
    renderCell: (params) => (
      <div>
      <Button variant="outlined" color="primary">
        编辑
      </Button>
      <Button variant="outlined" color="error" sx={{marginLeft:'2vw'}}>
        删除
      </Button>
      </div>
    ),
  },
];


export default function AdminPageItemInfoShowTable(props) {

  const rows = props.quertData
  // 使用 getRowId 属性指定自定义的行 ID：如果你无法为每行提供唯一的 id 属性，你可以使用 getRowId 属性来为每行指定自定义的 ID。getRowId 是一个回调函数，它接收行数据作为参数，并返回一个表示行 ID 的值。
  const getRowId = (row) => row.courtOpenInfoId; 

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
        getRowId={getRowId}
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