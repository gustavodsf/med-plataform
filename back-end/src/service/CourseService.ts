
import { getRepository, ISubCollection } from 'fireorm';

import { Course, Topic } from '../model/Course';

class CourseService {

    async getAllCourse() {
        const courseRepository = getRepository(Course);
        return await courseRepository.orderByAscending('name').find()
    }

    async deleteCourse(id: string) {
        const courseRepository = getRepository(Course);
        await courseRepository.delete(id);
        return {"message": "Usuário removido com sucesso!"}
    }
    
    async getCourse(id: string) {
        const courseRepository = getRepository(Course);
        return await courseRepository.findById(id);
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
        
        return course;
    }

    async updateCourse(id: string, name: string, topics: ISubCollection<Topic>) {
        const courseRepository = getRepository(Course);
        let course = new Course();
        course.id = id;
        course.name = name;
        course.topics = topics;
        course = await courseRepository.update(course);
        return course;
    }
}

export { CourseService }
