import http from '@/api/axios'

export default {
    // 글전체 목록 가지고 오기
    getNote:async(page)=>{
        let result;
        await http.get(`/note?page=${page}`
        ).then((res)=>{
            if(res.data.messgae){
                console.log(res.data.message);
                return;
            }
            result = res.data.data
            return;
        }).catch((err)=>{
            console.log(err);
            if(err.response.data){
                alert(err.response.data.message)
            }
        })
        return result;
    },

    // 글작성하기
    writeNote:async(reqData)=>{
        await http.post('/note',reqData
        ).then((res)=>{
            if (res.data.message){
                console.log(res.data.message);
                return;
            }
            console.log(res.data.data);
        }).catch((err)=>{
            console.log(err);
        })
    },

    // 글한개 가지고 오기
    getOneNote:async(noteIdx)=>{
        let result;
        await http.get(`/note/${noteIdx}`
        ).then((res)=>{
            if(res.status ===200){
                result = {
                    noteInfo:res.data.data,
                    comment:res.data.comment,
                }
                console.log(res.data.comment)
                return;
            }
            return;
        }).catch((err)=>{
            console.log(err)
        })
        return result
    },

    // 글 삭제
    deleteNote:async(noteIdx)=>{
        let result;
        await http.delete(`/note/${noteIdx}`
        ).then((res)=>{
            if(res.status===200){
                alert("삭제 성공")
                result='success'
                return;
            }
        }).catch((err)=>{
            console.log(err)
        })
        return result
    }
}