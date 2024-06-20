import { useEffect, useState } from 'react';
import './App.css';
import NhmCategory from './components/NhmCategory';
import axios from "./api/NhmAPI";
import NhmCategoryForm from './components/NhmCategoryForm';


function NhmApp() {
  // lấy dữ liệu từ api
  const [NhmCategories, setNhmCategories] = useState([]);

  const getCategories = async () => {
    try {
      const NhmCateResponse = await axios.get("NhmCategory");
      setNhmCategories(NhmCateResponse.data);
    } catch (error) {
      console.log("lỗi:", error);
    }
  }

  useEffect(() => {
    getCategories();
    console.log("NhmCategories:", NhmCategories);
  }, [])

  //trạng thái form
  const [NhmCategoryIsForm, setNhmCategoryIsForm] = useState(false);
  //dữ liệu form : Add/Edit
  let NhmCategoryInit = {
    NhmId: 0,
    NhmCategoryName: "",
    NhmCategoryStatus: true,
}
  const [NhmCategoryEdit, setNhmCategoryEdit] = useState(NhmCategoryInit);
  const NhmHandleAddNew = (param) => {
    setNhmCategoryIsForm(param);
  }
  const NhmHandleCategoryCloseForm = (param) => {
    setNhmCategoryIsForm(param);
  }
  const NhmHandleCategorySubmit = (param) => {
    let id = NhmCategories[NhmCategories.length - 1].NhmId;
    console.log("Mã:", id);
    param.NhmId = id + 1;
    NhmCategories.push(param);
    setNhmCategories((prev) => {
      return [...prev];
    })
    setNhmCategoryIsForm(false);
  }
  //hàm xử lý sự kiện xóa
  const NhmhandleDelete = (NhmId)=>{
    console.log("App-Delete-NhmId:",NhmId);
    // const NhmResponse = axios.delete(`https://666c2e2e49dbc5d7145cfd4f.mockapi.io/Nhmapi/Nhmv1/NhmCategory/${NhmId}`);
    const NhmResponse = axios.delete(`NhmCategory/${NhmId}`);
    console.log("NhmResponse-Delete",NhmResponse);
    let Nhmdelete = NhmCategories.filter(x=>x.NhmId !== NhmId);
    setNhmCategories(Nhmdelete);
    console.log("Deleted:",Nhmdelete);
  }
  const NhmhandleEdit =(NhmCategory)=>{
    setNhmCategoryEdit(NhmCategory);
    setNhmCategoryIsForm(true);
  }
  return (
    <div className="container border my-3">
      <h1>Lê Hoàng Long - Call API</h1>

      <NhmCategory renderNhmCategories={NhmCategories}
        onAddNew={NhmHandleAddNew}
        onNhmDelete={NhmhandleDelete} 
        onNhmEdit={NhmhandleEdit}/>
      <hr />
      {
        NhmCategoryIsForm === true ? <NhmCategoryForm
          renderNhmCategory = {NhmCategoryEdit}
          oncloseForm={NhmHandleCategoryCloseForm}
          onCategorySubmit={NhmHandleCategorySubmit} /> : ""
      }

    </div>
  );
}
export default NhmApp;