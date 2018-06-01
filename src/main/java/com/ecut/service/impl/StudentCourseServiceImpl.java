package com.ecut.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecut.dao.StudentCourseMapper;
import com.ecut.pojo.StudentCourse;
import com.ecut.service.StudentCourseService;

@Service
public class StudentCourseServiceImpl implements StudentCourseService {

	@Resource
	private StudentCourseMapper studentCourseMapper;
	
	@Override
	public int deleteByPrimaryKey(Long id) {
		int count = studentCourseMapper.deleteByPrimaryKey(id);
		return count;
	}

	@Override
	public int insert(StudentCourse record) {
		int count = studentCourseMapper.insert(record);
		return count;
	}

	@Override
	public int insertSelective(StudentCourse record) {
		int count = studentCourseMapper.insertSelective(record);
		return count;
	}

	@Override
	public StudentCourse selectByPrimaryKey(Long id) {
		StudentCourse studentCourse = studentCourseMapper.selectByPrimaryKey(id);
		return studentCourse;
	}

	@Override
	public int updateByPrimaryKeySelective(StudentCourse record) {
		int count = studentCourseMapper.updateByPrimaryKeySelective(record);
		return count;
	}

	@Override
	public int updateByPrimaryKey(StudentCourse record) {
		int count = studentCourseMapper.updateByPrimaryKey(record);
		return count;
	}

	@Override
	public List<StudentCourse> list(StudentCourse record) {
		List<StudentCourse> studentCourseList = studentCourseMapper.list(record);
		return studentCourseList;
	}

}
