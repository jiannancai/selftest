package com.ecut.controller;

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

import com.alibaba.fastjson.JSON;
import com.ecut.pojo.Course;
import com.ecut.pojo.StartChoose;
import com.ecut.service.CourseService;
import com.ecut.service.StartChooseService;

@Controller
@RequestMapping("/courseController")
public class CourseController {

	@Resource
	private CourseService courseService;

	@Resource
	private StartChooseService startChooseService;
	
	@RequestMapping("/list")
	public ModelAndView list(@ModelAttribute("course") Course course) {
		List<Course> courselist = courseService.list(course);
		StartChoose startChoose = new StartChoose();
		List<StartChoose> startChooseList = startChooseService.list(startChoose);
		while (startChooseList.size() != 1) {
			if (startChooseList.size() == 0) {
				startChoose.setId(1L);
				startChoose.setStatus("0");
				startChooseService.insert(startChoose);
			} else if (startChooseList.size() > 1) {
				for (int i = 0; i < startChooseList.size(); i++) {
					startChooseService.deleteByPrimaryKey(startChooseList.get(i).getId());
				}
			}
			startChoose = new StartChoose();
			startChooseList = startChooseService.list(startChoose);
		}
		startChoose = startChooseList.get(0);
		return new ModelAndView("/course/list").addObject("courselist", courselist).addObject("startChoose", startChoose);
	}

	@RequestMapping("/delete")
	@ResponseBody
	public Map<String, Object> delete(@RequestParam("id") Long id) {
		Map<String, Object> map = new HashMap<String, Object>();
		int count = courseService.deleteByPrimaryKey(id);
		if (count != 0) {
			map.put("result", true);
		}else {
			map.put("result", false);
		}
		return map;
	}

	@RequestMapping("/manageView")
	public ModelAndView manageView(@RequestParam("id") Long id) {
		Course course = courseService.selectByPrimaryKey(id);
		if (course == null) {
			course = new Course();
		}
		return new ModelAndView("/course/manage").addObject("course", course);
	}

	@RequestMapping("/manage")
	@ResponseBody
	public Map<String, Object> manage(@ModelAttribute("courseMessage") String courseMessage) {
		int count = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		Course course = JSON.parseObject(courseMessage, Course.class);
		List<Course> courseList = courseService.list(course);
		if(courseList != null && courseList.size()>0) {
			map.put("result", 3);
			return map;
		}
		if(course.getId() == null) {
			try {
				count = courseService.insert(course);
				if(count > 0) {
					map.put("result", 1);
				}else {
					map.put("result", 0);
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}else {
			try {
				count = courseService.updateByPrimaryKeySelective(course);
				if(count > 0) {
					map.put("result", 2);
				}else {
					map.put("result", 0);
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		return map;
	}
	
	@RequestMapping("/reflashChoiceStatus")
	@ResponseBody
	public Map<String, Object> reflashChoiceStatus(@ModelAttribute("id") Long id){
		Map<String, Object> map = new HashMap<String, Object>();
		StartChoose startChoose = startChooseService.selectByPrimaryKey(id);
		int count = 0;
		if(startChoose != null) {
			if("0".equals(startChoose.getStatus())) {
				startChoose.setStatus("1");
			}else {
				startChoose.setStatus("0");
			}
			try {
				count = startChooseService.updateByPrimaryKey(startChoose);
				if(count > 0) {
					if("0".equals(startChoose.getStatus())) {
						map.put("result", 1);
					}else {
						map.put("result", 2);
					}
				}else {
					map.put("result", 0);
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		return map;
	}
}
