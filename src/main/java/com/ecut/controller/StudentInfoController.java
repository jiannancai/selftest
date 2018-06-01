package com.ecut.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.ecut.pojo.Announcement;
import com.ecut.pojo.Course;
import com.ecut.pojo.Loginer;
import com.ecut.pojo.StartChoose;
import com.ecut.pojo.Student;
import com.ecut.pojo.StudentCourse;
import com.ecut.service.AnnouncementService;
import com.ecut.service.CourseService;
import com.ecut.service.StartChooseService;
import com.ecut.service.StudentCourseService;
import com.ecut.service.StudentService;

@Controller
@RequestMapping("/studentInfoController")
public class StudentInfoController {

	@Resource
	private StudentService studentService;

	@Resource
	private AnnouncementService announcementService;

	@Resource
	private CourseService courseService;

	@Resource
	private StudentCourseService studentCourseService;
	
	@Resource
	private StartChooseService startChooseService;
	
	@RequestMapping("/home")
	public ModelAndView home(HttpServletRequest httpServletRequest) {
        Loginer loginer= (Loginer)httpServletRequest.getSession().getAttribute("USERSESSONKEY");
        Student student = new Student();
		student.setStuNumber(loginer.getAccount());
		student.setPassword(loginer.getPassword());
		List<Student> studentList = studentService.list(student);
		student = studentList.get(0);
		
		Announcement record = new Announcement();
		List<Announcement> dataList = announcementService.list(record);
		List<Announcement> announcementList = new ArrayList<Announcement>();

        //获取三十天前日期
        Date today = new Date();
        Calendar theCa = Calendar.getInstance();
         theCa.setTime(today);
        theCa.add(theCa.DATE, -30);
        Date start = theCa.getTime();
        
		for(int i=0; i<dataList.size(); i++) {
			if(dataList.get(i).getModifyTime().getTime()>start.getTime()) {
				announcementList.add(dataList.get(i));
			}
		}
		return new ModelAndView("/studentInfo/home").addObject("announcementList", announcementList).addObject("student", student);
	}
	
	@RequestMapping("/personalInfo")
	public ModelAndView personalInfo(@RequestParam("id") Long id) {
		Student student = studentService.selectByPrimaryKey(id);
		if (student == null) {
			student = new Student();
		}
		return new ModelAndView("/studentInfo/personal").addObject("student", student);
	}
	
	@RequestMapping("/changePasswordView")
	public ModelAndView changePassword(@RequestParam("id") Long id) {
		Student student = studentService.selectByPrimaryKey(id);
		if (student == null) {
			student = new Student();
		}
		return new ModelAndView("/studentInfo/changePasswordView").addObject("student", student);
	}
	
	@RequestMapping("/changePassword")
	@ResponseBody
	public Map<String, Object> changePassword(@ModelAttribute("studentMessage") String studentMessage) {
		int count = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		Student student = JSON.parseObject(studentMessage, Student.class);
		List<Student> studentList = studentService.list(student);
		if (studentList != null && studentList.size() > 0) {
			map.put("result", 2);
			return map;
		}
		try {
			count = studentService.updateByPrimaryKeySelective(student);
			if (count > 0) {
				map.put("result", 1);
			} else {
				map.put("result", 0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	@RequestMapping("/getAnnouncementView")
	public ModelAndView getView(@RequestParam("id") Long id) {
		Announcement announcement = announcementService.selectByPrimaryKey(id);
		return new ModelAndView("/studentInfo/getAnnouncementView").addObject("announcement", announcement);
	}

	@RequestMapping("/selfChoiceView")
	public ModelAndView selfChoiceView(@RequestParam("stuNumber") String stuNumber) {
		StartChoose startChoose = new StartChoose();
		List<StartChoose> startChooseList = startChooseService.list(startChoose);
		startChoose = startChooseList.get(0);
		
		Course course = new Course();
		List<Course> courseList = courseService.list(course);
		StudentCourse studentCourse = new StudentCourse();
		studentCourse.setStuNumber(stuNumber);
		List<StudentCourse> studentCourseList = studentCourseService.list(studentCourse);
		List<Course> courseChosedList = new ArrayList<Course>();
		for(StudentCourse sc:studentCourseList) {
			for(Course c:courseList) {
				if(sc.getCouNumber().equals(c.getCouNumber())) {
					courseChosedList.add(c);
				}
			}
		}
		return new ModelAndView("/studentInfo/selfChoiceView").addObject("studentCourseList", studentCourseList)
				.addObject("courseChosedList", courseChosedList).addObject("stuNumber", stuNumber).addObject("startChoose", startChoose);
	}
	
	@RequestMapping("/cancelChoice")
	@ResponseBody
	public Map<String, Object> cancelChoice(@ModelAttribute("studentCourseMessage") String studentCourseMessage) {
		int count = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		StudentCourse studentCourse = JSON.parseObject(studentCourseMessage, StudentCourse.class);
		List<StudentCourse> studentCourseList = studentCourseService.list(studentCourse);
		if (studentCourseList != null && studentCourseList.size() > 0) {
			try {
				count = studentCourseService.deleteByPrimaryKey(studentCourseList.get(0).getId());
				if (count > 0) {
					map.put("result", 1);
				} else {
					map.put("result", 0);
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
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else {
			map.put("result", 2);
		}
		return map;
	}
	
	@RequestMapping("/choiceCourseView")
	@ResponseBody
	public ModelAndView choiceCourseView(@RequestParam("stuNumber") String stuNumber) {
		StartChoose startChoose = new StartChoose();
		List<StartChoose> startChooseList = startChooseService.list(startChoose);
		startChoose = startChooseList.get(0);
		if("0".equals(startChoose.getStatus())) {
			return new ModelAndView("/studentInfo/outtimeChoice");
		}
		
		Course course = new Course();
		List<Course> courseList = courseService.list(course);
		StudentCourse studentCourse = new StudentCourse();
		studentCourse.setStuNumber(stuNumber);
		List<StudentCourse> studentCourseList = studentCourseService.list(studentCourse);
		
		if(studentCourseList != null && studentCourseList.size()>0) {
			for(int i=0; i<studentCourseList.size(); i++) {
				for(int j=0; j<courseList.size(); j++) {
					if(courseList.get(j).getCouNumber().equals(studentCourseList.get(i).getCouNumber())) {
						courseList.remove(courseList.get(j));
						break;
					}
				}
			}
		}
		return new ModelAndView("/studentInfo/choiceCourseView").addObject("stuNumber", stuNumber).addObject("courseUnchosedList", courseList);
	}
	
	@RequestMapping("/confirmChoice")
	@ResponseBody
	public Map<String, Object> confirmChoice(@ModelAttribute("studentCourseMessage") String studentCourseMessage) {
		int count = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		StudentCourse studentCourse = JSON.parseObject(studentCourseMessage, StudentCourse.class);
		List<StudentCourse> studentCourseList = studentCourseService.list(studentCourse);
		if (studentCourseList != null && studentCourseList.size() > 0) {
			map.put("result", 2);
		}else {
			try {
				studentCourse.setChooseTime(new Date());
				count = studentCourseService.insert(studentCourse);
				if (count > 0) {
					map.put("result", 1);
				} else {
					map.put("result", 0);
				}
				Course course = new Course();
				course.setCouNumber(studentCourse.getCouNumber());
				List<Course> courseList = courseService.list(course);
				course = courseList.get(0);
				Integer actualCount = course.getActualCount()+1;
				course.setActualCount(actualCount);
				Integer remainCount = course.getRemainCount()-1;
				course.setRemainCount(remainCount);
				courseService.updateByPrimaryKeySelective(course);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return map;
	}
}
