import React from 'react'

export default function NhmCategory({ renderNhmCategories, onAddNew, onNhmDelete, onNhmEdit }) {
    console.log("renderNhmCategories: ", renderNhmCategories);
    let NhmCategoriesElement = renderNhmCategories.map((NhmCategory, index) => {
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{NhmCategory.NhmId}</td>
                <td>{NhmCategory.NhmCategoryName}</td>
                <td>{NhmCategory.NhmCategoryStatus === true ? "Hiển Thị" : "Tạm Khóa"}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => NhmhandleDelete(NhmCategory.NhmId)}>Delete</button>
                    <button className='btn btn-success' onClick={() => NhmhandleEdit(NhmCategory)}>Edit</button>
                </td>
            </tr>
        )
    })
    const NhmhandleDelete = (NhmId) => {
        if (window.confirm('Bạn Có Muốn Xóa ['+NhmId+'] Không?')) {
            console.log("Delete:", NhmId);
            onNhmDelete(NhmId);
        } else {

        }
    }
    const NhmhandleEdit = (NhmCategory)=>{
        onNhmEdit(NhmCategory);
    }

    const NhmHandleAdd = () => {
        onAddNew(true);
    }
    return (
        <div className='container m-2'>
            <h2>Danh Sách Loại Sản Phẩm</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Loại</th>
                        <th>Tên Loại</th>
                        <th>Trạng Thái</th>
                        <th>Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {NhmCategoriesElement}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={NhmHandleAdd}>Thêm Mới</button>
        </div>
    )
}