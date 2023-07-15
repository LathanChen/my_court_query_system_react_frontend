import React, { useState } from 'react';
import InfoListSearch from '../../components/InfoListSearch/InfoListSearch'
import AddInfoBar from '../../components/AddInfoBar/AddInfoBar'
import AdminInfoShowTable from '../../components/AdminInfoShowTable/AdminInfoShowTable'

export default function AdminPageInfoShow() {
    const [batchselection,setBatchselection] = useState([])
    const isBatchselectionChange = (data) =>{
        setBatchselection(data)
    }

    return (
        <div>
           <InfoListSearch></InfoListSearch>
           <AddInfoBar batchselection={batchselection} ></AddInfoBar>
           <AdminInfoShowTable batchselection={batchselection} isBatchselectionChange={isBatchselectionChange}></AdminInfoShowTable>
        </div>
    )
}