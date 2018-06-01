package com.ecut.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.ecut.pojo.Loginer;
import com.ecut.pojo.Student;
import com.ecut.pojo.Teacher;
import com.ecut.service.StudentService;
import com.ecut.service.TeacherService;

@Controller
@RequestMapping("/loginController")
public class LoginController {

	@Resource
	private TeacherService teacherService;

	@Resource
	private StudentService studentService;
	
	@RequestMapping(value = "/login",method = { RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public Map<String, Object> login(HttpServletRequest request,@RequestParam("loginMessage") String loginMessage) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Teacher> teaLoginList = null;
		List<Student> stuLoginList = null;
		Loginer loginer = JSON.parseObject(loginMessage, Loginer.class);
		if(loginer.getIdentity() == 1) {
			Teacher teacher = new Teacher();
			teacher.setAccount(loginer.getAccount());
			teacher.setPassword(loginer.getPassword());
			teaLoginList = teacherService.list(teacher);
			if(teaLoginList != null && teaLoginList.size() > 0) {
				request.getSession().setAttribute("USERSESSONKEY", loginer);
				map.put("result", 0);
			}else {
				map.put("result", 1);
			}
		}else {
			Student student = new Student();
			student.setStuNumber(loginer.getAccount());
			student.setPassword(loginer.getPassword());
			stuLoginList = studentService.list(student);
			if(stuLoginList != null && stuLoginList.size() > 0) {
				request.getSession().setAttribute("USERSESSONKEY", loginer);
				map.put("result", 2);
			}else {
				map.put("result", 3);
			}
		}
		return map;
	}
	
	@RequestMapping(value = "/loginout",method = { RequestMethod.GET, RequestMethod.POST})
	public ModelAndView loginout(HttpServletRequest request) {
		request.getSession().invalidate(); 
		return new ModelAndView("/login");
	}
}
