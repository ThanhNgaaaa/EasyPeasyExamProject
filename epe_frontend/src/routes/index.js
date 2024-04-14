//Config
import routesConfig from "../config/routes";
//Pages
import {
  Home,
  Course,
  Contact,
  Login,
  Profile,
  Quiz,
  EnrolledCourses,
  CoursesIns,
  QuizzesIns,
  CourseDetail,
  Lesson,
  QuizGame,
} from "../pages/index";

//Layouts
import StudentLayout from "../Layout/StudentLayout/StudentLayout";
import InstructorLayout from "../Layout/InstructorLayout/InstructorLayout";
import DashboardStudent from "../Layout/StudentLayout/DashboardStudent/DashboardStudent";
import DashboardInstructor from "../Layout/InstructorLayout/DashboardInstructor/DashboarInstructor";
import ProfileInstructor from "../Layout/InstructorLayout/ProfileInstructor/ProfileInstructor";
import CreateLesson from "../Layout/InstructorLayout/CreateLesson/CreateLesson";
import CreateVideo from "../Layout/InstructorLayout/CreateVideo/CreateVideo";
import CreateQuizzes from "../Layout/InstructorLayout/CreateQuizzes/CreateQuizzes";
import CreateCourse from "../Layout/InstructorLayout/CreateCourse/CreateCourse";
import UpdateCourse from "../Layout/InstructorLayout/UpdateCourse/UpdateCourse";
import CreateExam from "../Layout/InstructorLayout/CreateExam/CreateExam";
import QuizDetail from "../Layout/InstructorLayout/QuizDetail/QuizDetail";
import QuizResult from "../pages/QuizGame/QuizResult";
import UpdateExam from "../Layout/InstructorLayout/UpdateExam/UpdateExam";
import UpdateQuiz from "../Layout/InstructorLayout/UpdateQuizz/UpdateQuiz";
import CreateDocument from "../Layout/InstructorLayout/CreateDocument/CreateDocument";
import UpdateDocument from "../Layout/InstructorLayout/UpdateDocument/UpdateDocument";
import VideoDetail from "../Layout/InstructorLayout/VideoDetail/VideoDetail";

import CourseStudent from "../Layout/StudentLayout/CourseStudent/CourseStudent";
import CreateCourseStudent from "../Layout/StudentLayout/CreateCourse/CreateCourse";
import QuizStudent from "../Layout/StudentLayout/QuizStudent/QuizStudent";
import CreateQuizStudent from "../Layout/StudentLayout/CreateQuiz/CreateQuiz";
import Flashcard from "../Layout/StudentLayout/Flashcard/Flashcard";
import CreateFlashCard from "../Layout/StudentLayout/CreateFlashCard/CreateFlashCard";
import FlashcardDetail from "../Layout/StudentLayout/FlashcardDetail/FlashcardDetail";
import CreateLessonStudent from '../Layout/StudentLayout/CreateLesson/CreateLesson';
import CreateDocumentStudent from "../Layout/StudentLayout/CreateDocument/CreateDocument";
import createVideoStudent from "../Layout/StudentLayout/CreateVideo/CreateVideo";
import updateDocumentStudent from "../Layout/StudentLayout/UpdateDocument/UpdateDocument";
import videoDetailStudent from "../Layout/StudentLayout/VideoDetail/VideoDetail";
import updateCourseStudent from "../Layout/StudentLayout/UpdateCourse/UpdateCourse";
import quizDetailStudent from "../Layout/StudentLayout/QuizDetail/QuizDetail";
import createExamStudent from "../Layout/StudentLayout/CreateExam/CreateExam";
import UpdateQuizStudent from "../Layout/StudentLayout/UpdateQuizz/UpdateQuiz";
import TestExamList from "../pages/TestExam/TestExamList";
import TestExam from "../pages/TestExam/TestExam";
//Public Routes
const publicRoutes = [
  {
    path: routesConfig.home,
    component: Home,
  },
  {
    path: routesConfig.course,
    component: Course,
    layout: null,
  },
  {
    path: routesConfig.contact,
    component: Contact,
  },
  {
    path: routesConfig.login,
    component: Login,
    layout: null,
  },
  {
    path: routesConfig.profile,
    component: Profile,
    layout: StudentLayout,
  },
  {
    path: routesConfig.dashboard,
    component: DashboardStudent,
    layout: StudentLayout,
  },
  {
    path: routesConfig.profile,
    component: Profile,
    layout: StudentLayout,
  },
  {
    path: routesConfig.enrolledCourses,
    component: EnrolledCourses,
    layout: StudentLayout,
  },
  {
    path: routesConfig.quiz,
    component: Quiz,
    layout: null,
  },
  {
    path: routesConfig.dashboardInstructor,
    component: DashboardInstructor,
    layout: InstructorLayout,
  },

  {
    path: routesConfig.profileInstructor,
    component: ProfileInstructor,
    layout: InstructorLayout,
  },
  {
    path: routesConfig.coursesInstructor,
    component: CoursesIns,
    layout: InstructorLayout,
  },
  {
    path: routesConfig.quizzesInstructor,
    component: QuizzesIns,
    layout: InstructorLayout,
  },
  {
    path: routesConfig.createLesson + "/:CourseId",
    component: CreateLesson,
    layout: null,
  },
  {
    path: routesConfig.createVideo+"/:LessonId",
    component: CreateVideo,
    layout: null,
  },
  {
    path: routesConfig.videoDetail + "/:VideoId",
    component: VideoDetail,
    layout: null,
  },
  {
    path: routesConfig.createDocument+"/:LessonId",
    component: CreateDocument,
    layout: null,
  },
  {
    path: routesConfig.updateDocument + "/:DocumentId",
    component: UpdateDocument,
    layout: null,
  },
  {
    path: routesConfig.createQuizzes + "/:ExamId",
    component: CreateQuizzes,
    layout: null,
  },
  {
    path: routesConfig.createCourse,
    component: CreateCourse,
    layout: null,
  },
  {
    path: routesConfig.courseDetail + "/:CourseId",
    component: CourseDetail,
    layout: null,
  },
  {
    path: routesConfig.lesson + "/:CourseId",
    component: Lesson,
    layout: null,
  },
  {
    path: routesConfig.quizGame + "/:ExamId",
    component: QuizGame,
    layout: null,
  },
  {
    path: routesConfig.updateCourse + "/:CourseId",
    component: UpdateCourse,
    layout: null,
  },
  {
    path: routesConfig.createExam,
    component: CreateExam,
    layout: null,
  },
  {
    path: routesConfig.quizDetail + "/:ExamId",
    component: QuizDetail,
    layout: null,
  },
  {
    path: routesConfig.quizResult,
    component: QuizResult,
    layout: null,
  },
  {
    path: routesConfig.updateQuiz + "/:ExamId",
    component: UpdateExam,
    layout: null,
  },
  {
    path: routesConfig.updateQuestion + "/:QuestionId",
    component: UpdateQuiz,
    layout: null,
  },
  {
    path: routesConfig.courseStudent,
    component: CourseStudent,
    layout: StudentLayout,
  },
  {
    path: routesConfig.createCourseStudent,
    component: CreateCourseStudent,
    layout: null,
  },
  {
    path: routesConfig.quizStudent,
    component: QuizStudent,
    layout: StudentLayout,
  },
  {
    path: routesConfig.createQuizStudent +"/:ExamId",
    component: CreateQuizStudent,
    layout: null,
  },
  {
    path: routesConfig.flashcard,
    component: Flashcard,
    layout: StudentLayout,
  },
  {
    path: routesConfig.createFlashcard,
    component: CreateFlashCard,
    layout: null,
  },
  {
    path: routesConfig.flashcardDetail+"/:Id",
    component: FlashcardDetail,
    layout: null,
  },
  {
    path: routesConfig.createLessonStudent + "/:CourseId",
    component: CreateLessonStudent,
    layout: null,
  },
  {
    path: routesConfig.createDocumentStudent+"/:LessonId",
    component: CreateDocumentStudent,
    layout: null,
  },{
    path: routesConfig.createVideoStudent+"/:LessonId",
    component: createVideoStudent,
    layout: null,
  },{
    path: routesConfig.updateDocumentStudent + "/:DocumentId",
    component: updateDocumentStudent,
    layout: null,
  },{
    path: routesConfig.videoDetailStudent + "/:VideoId",
    component: videoDetailStudent,
    layout: null,
  },{
    path: routesConfig.updateCourseStudent + "/:CourseId",
    component: updateCourseStudent,
    layout: null,
  },{
    path: routesConfig.quizDetailStudent + "/:ExamId",
    component: quizDetailStudent,
    layout: null,
  },{
    path: routesConfig.createExamStudent,
    component: createExamStudent,
    layout: null,
  },{
    path: routesConfig.updateQuizStudent + "/:ExamId",
    component: UpdateExam,
    layout: null,
  },{
    path: routesConfig.updateQuestionStudent + "/:QuestionId",
    component: UpdateQuizStudent,
    layout: null,
  },{
    path: routesConfig.testExamList,
    component: TestExamList,
    layout: null,
  },
  {
    path: routesConfig.testExam + "/:ExamId",
    component: TestExam,
    layout: null,
  },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
