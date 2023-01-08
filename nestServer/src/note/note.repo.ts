import { EntityRepository, Repository } from 'typeorm'
import { Note } from './entities/note.entity';

@EntityRepository(Note)
export class NoteRepo extends Repository<Note> {
    
    async testTransction (){
        // 숙제 2. repo로 데이터를 이동시켜서 값을 수정, 변경하는 로직 구성해보기.
        
    }
}