'use client';

// Import the content from the course detail page directly
import CourseDetail from '../../Pages/courses/course-detail';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return <CourseDetail params={{ courseId: params.id }} />;
}