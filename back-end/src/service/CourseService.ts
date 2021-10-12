import { getRepository } from 'fireorm';
import { runTransaction } from 'fireorm';

import { Course } from '@model/Course';
import { Topic } from '@model/Topic';

class CourseService {

    async getAllCourse() {
        const courseRepository = getRepository(Course);
        const topicRepository = getRepository(Topic);
        const courses = await courseRepository.orderByAscending("name").find();

        for(let i = 0; i < courses.length; i++) {
            const id = courses[i].id;
            const topics = await topicRepository.whereEqualTo("courseId", id).orderByAscending("name").find();
            courses[i].topics = topics;
        }
        return courses;
    }

    async getCourse(id: string) {
        await runTransaction(async tran => {
            const courseTranRepository = tran.getRepository(Course);
            const topicTranRepository = tran.getRepository(Topic);
            const course = await courseTranRepository.findById(id);
            const topics = await topicTranRepository.whereEqualTo("courseId", course.id).orderByAscending("name").find();
            course.topics = topics;
            return course;
        });
    }

    async deleteCourse(id: string) {
        await runTransaction(async tran => {
            const courseTranRepository = tran.getRepository(Course);
            const topicTranRepository = tran.getRepository(Topic);
            const course = await courseTranRepository.findById(id);
            const topics = await topicTranRepository.whereEqualTo("courseId", course.id).find();
            topics.forEach( async (child: Topic) => {
                await topicTranRepository.delete(child.id);
            });
            await courseTranRepository.delete(id);
        });
        return {"message": "Curso removido com sucesso!"}
    }
    
    async addNewCourse(name: string, enabled: boolean, topics: Array<Topic>) {
        
        let course = new Course();
        course.name = name;
        course.enabled = enabled;

        await runTransaction(async tran => {
            const courseTranRepository = tran.getRepository(Course);
            const topicTranRepository = tran.getRepository(Topic);
            course = await courseTranRepository.create(course);
            topics.forEach( async (child: Topic) => {
                child.courseId = course.id;
                await topicTranRepository.create(child);
            });
        });
        return course;
    }

    async updateCourse(id: string, name: string, enabled: boolean, topics: Array<Topic>) {
        let course = new Course();
        course.name = name;
        course.id = id;
        course.enabled = enabled;

        await runTransaction(async tran => {
            const courseTranRepository = tran.getRepository(Course);
            const topicTranRepository = tran.getRepository(Topic);
            const topicsDB = await topicTranRepository.whereEqualTo("courseId", id).find();

            courseTranRepository.update(course);
            const myIdSet = new Set()
            for(let i = 0 ; i < topics.length; i++){
                if(topics[i].hasOwnProperty('id') && topics[i].id != ''){
                    topicTranRepository.update(topics[i]);
                    myIdSet.add(topics[i].id);
                } else {
                    topics[i].courseId = id;
                    topicTranRepository.create(topics[i]);
                }
            }
            
            topicsDB.forEach((topic) => {
                if(!myIdSet.has(topic.id)){
                    topicTranRepository.delete(topic.id);
                }
            });
            

        });

        return course;
    }

    async findByName(name: string){
        const courseRepository = getRepository(Course);
        const course = await courseRepository.whereEqualTo(crs => crs.name, name).find();
        return course;
    }
}

export { CourseService }
