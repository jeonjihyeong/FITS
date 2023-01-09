import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { NoteInputDto } from "./dto/note-input.dto";
import { Note } from "./entities/note.entity";

@CustomRepository(Note)
export class NoteRepository extends Repository<Note>{
    async writeNote(NoteInputDto: NoteInputDto) {
        const {title,content}=NoteInputDto
        console.log("레포지토리")
        let res:any;
        try{
            res = await this.manager.save(Note, NoteInputDto)
        }catch(err){
            console.log(err)
        }
        return res;
    }

}