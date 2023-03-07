const express=require('express');
const {note}=require('../../controller')
const noteRouter= express.Router();


// 게시글 작성
noteRouter.post('/', note.writeNote);

// 게시글 가져오기
noteRouter.get('/all/:page', note.getNote);
// TODO: 모든게시글에 검색 옵션을 넣어서 하는 방식으로 api 변경

// 내 노트 가져오기
noteRouter.get('/my', note.getMyNote)

// 게시글 좋아요
noteRouter.post('/view/like/:noteIdx', note.likeNote);
noteRouter.delete('/view/unlike/:noteIdx', note.unLikeNote);

// 게시글 view
noteRouter.get('/view/:noteIdx', note.getOneNote);

// 게시글 수정
noteRouter.put('/view/:noteIdx',note.updateNote);

// 게시글 삭제
noteRouter.delete('/view/:noteIdx',note.deleteNoteContent)


module.exports= noteRouter