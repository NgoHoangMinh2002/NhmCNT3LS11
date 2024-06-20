import React, { useState } from 'react';
import axios from '../api/NhmAPI.js';

export default function NhmCategoryFrom({ onCloseForm, onCategorySubmit, renderLHLCategory }) {
    const [NhmId, setNhmId] = useState(0);
    const [NhmCategoryName, setNhmCategoryName] = useState("");
    const [NhmCategoryStatus, setNhmCategoryStatus] = useState(true);

    useEffect(() => {
        setNhmId(renderNhmCategory.NhmId);
        setNhmCategoryName(renderNhmCategory.NhmCategoryName);
        setNhmId(renderNhmCategory.NhmCategoryStatus);
    });
    const NhmHandleClose = () => {
        oncloseForm(false);
    }
    const NhmHandleSubmit = async (event) => {
        event.preventDefault();
        if (NhmId === 0) { //thêm
            let NhmCategory = {
                NhmId: 0,
                NhmCategoryName: NhmCategoryName,
                NhmCategoryStatus: NhmCategoryStatus
            }
            await axios.post("NhmCategory", NhmCategory);
            onCategorySubmit(NhmCategory);
        } else {//sửa
            let NhmCategory = {
                NhmId: NhmId,
                NhmCategoryName: NhmCategoryName,
                NhmCategoryStatus: NhmCategoryStatus
            }
            await axios.put("NhmCategory", NhmCategory);
            onCategorySubmit(NhmCategory);
        }
    }
    return (
        <div>
            <form>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Name</span>
                    <input type="text" class="form-control" name='NhmCategoryName'
                        value={NhmCategoryName}
                        onChange={(ev) => setNhmCategoryName(ev.target.value)}
                        placeholder="Category Name"
                        aria-label="Category Name" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Status</span>
                    <select className='form-control'
                        name='NhmCategoryStatus'
                        value={NhmCategoryStatus}
                        onChange={(ev) => setNhmCategoryStatus(ev.target.value)}>
                        <option value={true}>Hiển Thị</option>
                        <option value={false}>Tạm Khóa</option>
                    </select>
                </div>
                <button className='btn btn-success' onClick={NhmHandleSubmit}>Ghi Lại</button>
                <button className='btn btn-danger' onClick={NhmHandleClose}>Đóng</button>
            </form>
        </div>
    )
}