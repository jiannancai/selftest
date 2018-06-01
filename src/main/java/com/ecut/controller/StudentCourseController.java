package com.ecut.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ecut.pojo.Course;
import com.ecut.pojo.StudentCourse;
import com.ecut.service.CourseService;
import com.ecut.service.StudentCourseService;

@Controller
@RequestMapping("/studentCourseController")
public class StudentCourseController {

	@Resource
	private StudentCourseService studentCourseService;
	

	@Resource
	private CourseService courseService;

	@RequestMapping("/list")
	public ModelAndView list(@ModelAttribute("studentCourse") StudentCourse studentCourse) {
		List<StudentCourse> studentCourseList = studentCourseService.list(studentCourse);
		Date date = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		for(int i=0; i < studentCourseList.size(); i++) {
			date = studentCourseList.get(i).getChooseTime();
			studentCourseList.get(i).setShowTime(sdf.format(date));
		}
		return new ModelAndView("/studentCourse/list").addObject("studentCourseList", studentCourseList);
	}

	@RequestMapping("/delete")
	@ResponseBody
	public Map<String, Object> delete(@RequestParam("id") Long id) {
		Map<String, Object> map = new HashMap<String, Object>();
		StudentCourse studentCourse = studentCourseService.selectByPrimaryKey(id);
		int count = studentCourseService.deleteByPrimaryKey(id);
		if (count != 0) {
			map.put("result", true);
		}else {
			map.put("result", false);
		}
		
		Course course = new Course();
		course.setCouNumber(studentCourse.getCouNumber());
		List<Course> courseList = courseService.list(course);
		course = courseList.get(0);
		Integer actualCount = course.getActualCount()-1;
		course.setActualCount(actualCount);
		Integer remainCount = course.getRemainCount()+1;
		course.setRemainCount(remainCount);
		courseService.updateByPrimaryKeySelective(course);
		
		return map;
	}
}
