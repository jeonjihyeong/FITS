import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Entity, EntityRepository, Repository } from "typeorm";
import { NoteInputDto } from "./dto/note-input.dto";
import { Note } from "./entities/note.entity";


@EntityRepository(Note)
export class NoteRepository extends Repository<Note>{}
// @CustomRepository(Note)
// export class NoteRepository extends Repository<Note>{
    
//     async writeNote(NoteInputDto: NoteInputDto) {
//         const {title,content}=NoteInputDto
//         console.log("레포지토리")
//         let res:any;
//         const test: Note = {noteIdx: 0,title : ' a', content : 'aa'}
//         try{
//             res = this.manager.save(test)
//         }catch(err){
//             console.log(err)
//         }
//         return res;
//     }

// }