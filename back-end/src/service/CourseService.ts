
import { getRepository, ISubCollection } from 'fireorm';
import { Course, Topic } from '../model/Course';

class CourseService {

    async getAllCourse() {
        const courses = []
        const courseRepository = getRepository(Course);
        const docs = await courseRepository.orderByAscending('name').find()
        for(let i=0; i < docs.length; i++){
            const topics = await docs[i].topics.find();
            courses.push({
                id: docs[i].id,
                name: docs[i].name,
                topics: topics
            });
        }
        return courses;
    }

    async getCourse(id: string) {
        const courseRepository = getRepository(Course);
        const doc = await courseRepository.findById(id);
        const topics = await doc.topics.find();
        return {
            id: doc.id,
            name: doc.name,
            topics: topics
        }
    }

    async deleteCourse(id: string) {
        const courseRepository = getRepository(Course);
        await courseRepository.delete(id);
        return {"message": "Curso removido com sucesso!"}
    }
    
    async addNewCourse(name: string, topics: Array<Topic>) {
        const courseRepository = getRepository(Course);
        let course = new Course();
        course.name = name;
        course = await courseRepository.create(course);
        const batch = await course.topics?.createBatch();

        topics.forEach( async (child: Topic) => {
            await batch.create(child);
        });
        
        await batch.commit()
        return course;
    }

    async updateCourse(id: string, name: string, topics: Array<Topic>) {
        const courseRepository = getRepository(Course);
        let course = new Course();
        course.id = id;
        course.name = name;
        course = await courseRepository.update(course);
        course = await courseRepository.findById(id);
        const batch = await course.topics?.createBatch();
        topics.forEach( async (child: Topic) => {
            await batch.update(child);
        });

        await batch.commit()
        return course;
    }

    async findByName(name: string){
        const courseRepository = getRepository(Course);
        const course = await courseRepository.whereEqualTo(crs => crs.name, name).find();
        return course;
    }
}

export { CourseService }
