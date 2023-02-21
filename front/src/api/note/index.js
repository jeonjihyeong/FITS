import http from '@/api/axios'

// 글전체 목록 가지고 오기
export const getNote=async(page)=>{
    let result;
    try{
        result = await http.get(`/note/all/${page}`)
    }catch(err){
        if(err.response.data){
            alert(err.response.data.message)
        }
        console.log(err);
    }
    if(result.data.messgae){
        console.log(result.data.message);
        return;
    }
    return result.data;
}


// 글작성하기
export const writeNote=async(reqData)=>{
    let result;
    try{
        result = await http.post('/note',reqData)
    }catch(err){
        console.log(err);
    }
    if (result.data.message){
        console.log(result.data.message);
        return 0;
    }
    console.log(result.data.data);
    return 1;
}

// 글한개 가지고 오기
export const getOneNote=async(noteIdx)=>{
    let result;
    try{
        result = await http.get(`/note/view/${noteIdx}`)
    }catch(err){
        console.log(err);
    }
    
    if(result.status ===200){
        console.log(result.data.comment)
        return {
            noteInfo:result.data.data,
            comment:result.data.comment,
            }
    }
    return;
}

// 글 삭제
export const deleteNote=async(noteIdx)=>{
    let result;
    try{
        await http.delete(`/note/view/${noteIdx}`)
    }catch(err){
        console.log(err);
    }
    if(result.data.message==="success"){
        alert("삭제 성공")
        return 1
    }
    return 0
}

export const changeNote=async(noteIdx)=>{
    let result
    try{
        result = await http.put(`/note/view/${noteIdx}`)
    }catch(err){
        console.log(err);
    }
    console.log(result);
    return 1
}

export const noteLike=async(noteIdx)=>{
    let result
    try{
        result = await http.post(`/view/like/${noteIdx}`)
    }catch(err){
        console.log(err);
    }
    console.log(result);
    return 1
}