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
import com.ecut.pojo.DepartmentSubject;
import com.ecut.service.DepartmentSubjectService;

@Controller
@RequestMapping("/departmentSubjectController")
public class DepartmentSubjectController {

	@Resource
	private DepartmentSubjectService departmentSubjectService;

	@RequestMapping("/list")
	public ModelAndView list(@ModelAttribute("departmentSubject") DepartmentSubject departmentSubject) {
		List<DepartmentSubject> departmentSubjectList = departmentSubjectService.list(departmentSubject);
		return new ModelAndView("/departmentSubject/list").addObject("departmentSubjectList", departmentSubjectList);
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public Map<String, Object> delete(@RequestParam("id") Long id){
		Map<String, Object> map = new HashMap<String, Object>();
		int count = departmentSubjectService.deleteByPrimaryKey(id);
		if(count != 0) {
			map.put("result", true);
		}else {
			map.put("result", false);
		}
		return map;
	}

	@RequestMapping("/manageView")
	public ModelAndView manageView(@RequestParam("id") Long id) {
		DepartmentSubject departmentSubject = departmentSubjectService.selectByPrimaryKey(id);
		if (departmentSubject == null) {
			departmentSubject = new DepartmentSubject();
		}
		return new ModelAndView("/departmentSubject/manage").addObject("departmentSubject", departmentSubject);
	}


	@RequestMapping("/manage")
	@ResponseBody
	public Map<String, Object> manage(@ModelAttribute("departmentSubjectMessage") String departmentSubjectMessage) {
		int count = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		DepartmentSubject departmentSubject = JSON.parseObject(departmentSubjectMessage, DepartmentSubject.class);
		List<DepartmentSubject> departmentSubjectList = departmentSubjectService.list(departmentSubject);
		if(departmentSubjectList != null && departmentSubjectList.size()>0) {
			map.put("result", 3);
			return map;
		}
		if(departmentSubject.getId() == null) {
			try {
				count = departmentSubjectService.insert(departmentSubject);
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
				count = departmentSubjectService.updateByPrimaryKeySelective(departmentSubject);
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
