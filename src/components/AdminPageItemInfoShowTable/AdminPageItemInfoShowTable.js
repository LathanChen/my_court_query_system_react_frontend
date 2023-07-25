import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import axios from 'axios'; //部署用


export default function AdminPageItemInfoShowTable(props) {

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
      // params参数是包含以下属性的对象：
      // row: 表示当前行的数据对象。
      // field: 表示当前单元格所属列的字段名（列配置中的field属性值）。
      // value: 表示当前单元格的值，即该行在field字段上的值。
      // 通过使用params对象，我们可以在renderCell函数中获取当前单元格所在行的数据以及当前单元格的值，并根据这些信息来自定义单元格的显示内容。
      renderCell: (params) => (
        <div>
          <Button variant="outlined" color="primary" onClick={() => editInfo(params.row.courtOpenInfoId)}>
            编辑
          </Button>
          <Button variant="outlined" color="error" sx={{ marginLeft: '2vw' }} onClick={() =>deleteInfo([params.row.courtOpenInfoId])}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  const deleteInfo = (data) => {
    const fetchData = async (data) => {
            console.log(data)
            try {
                //   console.log(setTimetoString(courtOpenBeginTime))
                const response = await api.delete('/courtOpenInfo/deleteinfo', {data})
                // console.log(response.data)
                if (response.data === true) {
                    // todo:出现“添加成功”提示框
                    console.log('成功了')
                    // setShowSuccessAlert(true)
                    props.InfoListSearchRefresh(true) 
                }
            }
            catch (error) {
                console.error(error)
                // setErrorMsg(error)
            }

    }
    
    fetchData(data)
}

  const rows = props.quertData
  // 使用 getRowId 属性指定自定义的行 ID：如果你无法为每行提供唯一的 id 属性，你可以使用 getRowId 属性来为每行指定自定义的 ID。getRowId 是一个回调函数，它接收行数据作为参数，并返回一个表示行 ID 的值。
  const getRowId = (row) => row.courtOpenInfoId; 

  const navigate = useNavigate();

  const editInfo = (data) =>{
    console.log(data)
    // 传递带变量的路由地址时，要使用模板字符串
    navigate(`/adminpage/editinfo/${data}`)
  }
  
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