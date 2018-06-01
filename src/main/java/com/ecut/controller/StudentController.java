package com.ecut.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.ecut.pojo.DepartmentSubject;
import com.ecut.pojo.Student;
import com.ecut.service.DepartmentSubjectService;
import com.ecut.service.StudentService;
import com.ecut.upload.UploadExcelUtil;

@Controller
@RequestMapping("/studentController")
public class StudentController {

	@Resource
	private StudentService studentService;

	@Resource
	private DepartmentSubjectService departmentSubjectService;

	@RequestMapping("/list")
	public ModelAndView list(@ModelAttribute("student") Student student) {
		List<Student> studentList = studentService.list(student);
		return new ModelAndView("/student/list").addObject("studentList", studentList);
	}

	@RequestMapping("/delete")
	@ResponseBody
	public Map<String, Object> delete(@RequestParam("id") Long id) {
		Map<String, Object> map = new HashMap<String, Object>();
		int count = studentService.deleteByPrimaryKey(id);
		if (count != 0) {
			map.put("result", true);
		}else {
			map.put("result", false);
		}
		return map;
	}

	@RequestMapping("/manageView")
	public ModelAndView manageView(@RequestParam("id") Long id) {
		Student student = studentService.selectByPrimaryKey(id);
		if (student == null) {
			student = new Student();
		}
		DepartmentSubject departmentSubject = new DepartmentSubject();
		List<DepartmentSubject> departmentSubjectList = departmentSubjectService.list(departmentSubject );
		return new ModelAndView("/student/manage").addObject("student", student).addObject("departmentSubjectList", departmentSubjectList);
	}

	@RequestMapping("/manage")
	@ResponseBody
	public Map<String, Object> manage(@ModelAttribute("studentMessage") String studentMessage) {
		int count = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		Student student = JSON.parseObject(studentMessage, Student.class);
		List<Student> studentList = studentService.list(student);
		if(studentList != null && studentList.size()>0) {
			map.put("result", 3);
			return map;
		}
		if(student.getId() == null) {
			try {
				count = studentService.insert(student);
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
				count = studentService.updateByPrimaryKeySelective(student);
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
    @RequestMapping("/download")    
    public ResponseEntity<byte[]> download() throws IOException {
    	String rootPath = this.getClass().getResource("/").getPath();
        String path=rootPath.substring(0, rootPath.length()-16)+"download/学生信息上传模板.xlsx";
        File file=new File(path);  
        HttpHeaders headers = new HttpHeaders();    
        String fileName=new String("学生信息上传模板.xlsx".getBytes("UTF-8"),"iso-8859-1");
        headers.setContentDispositionFormData("attachment", fileName);   
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);   
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),headers, HttpStatus.OK);    
    }
    
    
    @RequestMapping("/upload")    
	@ResponseBody
    public  ModelAndView upload(HttpServletRequest request,@ModelAttribute("student") Student student) throws Exception {

    	String message = "";
		List<Student> studentList = new ArrayList<Student>();
    	MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;  

        InputStream in =null;
        List<List<Object>> listob = null;
        MultipartFile file = multipartRequest.getFile("uploadfile");
        if(file == null || file.isEmpty()){
            throw new Exception("文件不存在！");
        }
        in = file.getInputStream();
        listob = new UploadExcelUtil().getBankListByExcel(in,file.getOriginalFilename());
        in.close();

        //检验模板
    	Field[] fields = Student.class.getDeclaredFields();
    	Set<String> fieldSet = new HashSet<String>();
        if(!file.getOriginalFilename().contains("学生信息上传模板")) {
        	message = "错误模板，请重新上传";
        	student = new Student();
    		List<Student> stuList = studentService.list(student);
    		return new ModelAndView("/student/list").addObject("studentList", stuList).addObject("message", message);
        }
    	for(int i=0;i<fields.length;i++) {
    		fieldSet.add(fields[i].getName());
    	}
    	for(int i=0; i<listob.get(0).size(); i++) {
    		if(!fieldSet.contains(listob.get(0).get(i))) {
    			message = "模板标题错误，请重新上传";
    	    	student = new Student();
    			List<Student> stuList = studentService.list(student);
    			return new ModelAndView("/student/list").addObject("studentList", stuList).addObject("message", message);
    		}
    	}
    	//数据合成
    	String dataJson = "{";
    	for(int i=1; i<listob.size(); i++) {
    		dataJson = "{";
    		for(int j=0; j<listob.get(i).size(); j++) {
        		dataJson = dataJson + "\""+listob.get(0).get(j)+ "\":\""+listob.get(i).get(j)+"\",";
    		}
    		dataJson = dataJson.substring(0, dataJson.length()-2)+"\"}";
    		student = null;
    		try {
    			student = JSON.parseObject(dataJson, Student.class);
    		}catch(Exception e) {
    			message = "模板数据错误，请重新上传";
    	    	student = new Student();
    			List<Student> stuList = studentService.list(student);
    			return new ModelAndView("/student/list").addObject("studentList", stuList).addObject("message", message);
    		}
    		if(student != null) {
    			student.setPassword("123456");
        		studentList.add(student);
    		}
    	}
    	//插入数据库
    	if(studentList.size()>0) {
    		for(Student stu:studentList) {
    			studentService.insert(stu);
    		}
    	}
    	message = "上传成功";
    	student = new Student();
		List<Student> stuList = studentService.list(student);
		return new ModelAndView("/student/list").addObject("studentList", stuList).addObject("message", message);
    }
}
