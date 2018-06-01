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
import com.ecut.pojo.Teacher;
import com.ecut.service.TeacherService;

@Controller
@RequestMapping("/teacherController")
public class TeacherController {

	@Resource
	private TeacherService teacherService;

	@RequestMapping("/pageSelection")
	public ModelAndView pageSelection() {
		return new ModelAndView("/teacher/pageSelection");
	}

	@RequestMapping("/list")
	public ModelAndView list(@ModelAttribute("teacher") Teacher teacher) {
		List<Teacher> teacherlist = teacherService.list(teacher);
		return new ModelAndView("/teacher/list").addObject("teacherlist", teacherlist);
	}

	@RequestMapping("/delete")
	@ResponseBody
	public Map<String, Object> delete(@RequestParam("id") Long id) {
		Map<String, Object> map = new HashMap<String, Object>();
		int count = teacherService.deleteByPrimaryKey(id);
		if (count != 0) {
			map.put("result", true);
		}else {
			map.put("result", false);
		}
		return map;
	}

	@RequestMapping("/manageView")
	public ModelAndView manageView(@RequestParam("id") Long id) {
		Teacher teacher = teacherService.selectByPrimaryKey(id);
		if (teacher == null) {
			teacher = new Teacher();
		}
		return new ModelAndView("/teacher/manage").addObject("teacher", teacher);
	}

	@RequestMapping("/manage")
	@ResponseBody
	public Map<String, Object> manage(@ModelAttribute("teacherMessage") String teacherMessage) {
		int count = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		Teacher teacher = JSON.parseObject(teacherMessage, Teacher.class);
		List<Teacher> teacherList = teacherService.list(teacher);
		if(teacherList != null && teacherList.size()>0) {
			map.put("result", 3);
			return map;
		}
		if(teacher.getId() == null) {
			try {
				count = teacherService.insert(teacher);
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
				count = teacherService.updateByPrimaryKeySelective(teacher);
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
}
