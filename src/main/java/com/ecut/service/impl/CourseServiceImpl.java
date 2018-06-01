package com.ecut.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecut.dao.CourseMapper;
import com.ecut.pojo.Course;
import com.ecut.service.CourseService;

@Service
public class CourseServiceImpl implements CourseService {

	@Resource
	private CourseMapper courseMapper;
	
	@Override
	public int deleteByPrimaryKey(Long id) {
		int count = courseMapper.deleteByPrimaryKey(id);
		return count;
	}

	@Override
	public int insert(Course record) {
		int count = courseMapper.insert(record);
		return count;
	}

	@Override
	public int insertSelective(Course record) {
		int count = courseMapper.insertSelective(record);
		return count;
	}

	@Override
	public Course selectByPrimaryKey(Long id) {
		Course course = courseMapper.selectByPrimaryKey(id);
		return course;
	}

	@Override
	public int updateByPrimaryKeySelective(Course record) {
		int count = courseMapper.updateByPrimaryKeySelective(record);
		return count;
	}

	@Override
	public int updateByPrimaryKey(Course record) {
		int count = courseMapper.updateByPrimaryKey(record);
		return count;
	}

	@Override
	public List<Course> list(Course record) {
		List<Course> courseList = courseMapper.list(record);
		return courseList;
	}

}
