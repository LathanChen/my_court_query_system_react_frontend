import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import { Image } from 'antd';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog'
// import './QueryForm.css'
// import Slider from "react-slick";
// import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
// import CircularProgress from '@mui/material/CircularProgress';
// import { Link } from 'react-router-dom';
// import { Col, Row } from 'antd';
// import { Pagination } from 'antd';
import api from '../../api';

export default function AdminPageCourtInfoList() {

    const columns = [
        { id: 'courtId', label: '编号', minWidth: 100 },
        {
            id: 'imgUrl',
            label: '场馆图片',
            minWidth: 100,
            renderCell: (params) => (
                <CardMedia
                    component="img"
                    height="140"
                    image={params.courtImage}
                    alt="描述性文本"
                />
            ),
        },
        { id: 'courtName', label: '场馆名称', minWidth: 170 },
        {
            id: 'courtTelNum',
            label: '电话',
            minWidth: 170
        },
        {
            id: 'actions',
            label: '操作',
            minWidth: 200,
            renderCell: (params) => (
                <div>
                    <Button variant="outlined" color="primary" onClick={() => editInfo(params.row.courtOpenInfoId)}>
                        编辑
                    </Button>
                    <Button variant="outlined" color="error" sx={{ marginLeft: '2vw' }} onClick={() => openDialog([params.row.courtOpenInfoId])}>
                        删除
                    </Button>
                </div>
            ),
        },
    ];

    const navigate = useNavigate();

    const [shouldOpenDialog, setShouldOpenDialog] = useState(false)

    const [wantToDeleteCourtId, setWantToDeleteCourtId] = useState('')

    const [loading, setLoading] = useState(true)

    const editInfo = (courtId) => {
        navigate(`/adminpage/editcourtinfo/${courtId}`)
    }


    const openDialog = (courtId) => {
        setShouldOpenDialog(true)
        setWantToDeleteCourtId(courtId)
    }

    const closeDialog = () => {
        setShouldOpenDialog(false)
    }

    const sendDeleteFetch = async () => {
        try {
            const response = await api.delete(`/courtinfo/deleteinfobyid/${wantToDeleteCourtId}`)
            if (response.data) {
                console.log("成功了！")
                getCourtInfoList()
                closeDialog()
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    // const rows = [
    //     {
    //         courtImage: null,
    //         courtId: 1,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 2,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 3,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 4,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 5,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 6,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 7,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 8,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 9,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 10,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    //     {
    //         courtImage: '/images/courtInfoImages/1695362463188_slamdunk.jpg',
    //         courtId: 11,
    //         courtName: 'aaa',
    //         courtTelNum: '123416'
    //     },
    // ]
    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const [courtInfoList, setCourtInfoList] = useState([])

    const getCourtInfoList = async () => {
        try {
            const response = await api.get('/courtinfo/getCourtList');
            setCourtInfoList(response.data)
            setLoading(false)
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCourtInfoList()

    }, [])

    // const handleSlideChange = (value) => {
    //     setCurrentSlide(value);
    // };

    return (
        loading ? <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '92vh', // 可根据实际情况调整高度
        }}><CircularProgress></CircularProgress></div> :
            <div style={{
                display: 'flex',
                border: '1px solid skyblue',
            }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <ConfirmationDialog
                        open={shouldOpenDialog}
                        onClose={closeDialog}
                        onConfirm={sendDeleteFetch}
                    >
                    </ConfirmationDialog>
                    <TableContainer sx={{ maxHeight: '80vh' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courtInfoList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.courtId}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'imgUrl' ?
                                                                <Image
                                                                    width={'130px'}
                                                                    height={'100px'}
                                                                    src={value ? `${process.env.PUBLIC_URL}${value}` : 'error'}
                                                                    fallback="data:image/png;base64,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"
                                                                />
                                                                : column.id === 'actions' ?
                                                                    <div>
                                                                        <Button variant="outlined" color="primary" onClick={() => editInfo(row.courtId)}>
                                                                            编辑
                                                                        </Button>
                                                                        <Button variant="outlined" color="error" sx={{ marginLeft: '2vw' }} onClick={() => openDialog(row.courtId)}>
                                                                            删除
                                                                        </Button>
                                                                    </div>
                                                                    : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={courtInfoList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

    )
}