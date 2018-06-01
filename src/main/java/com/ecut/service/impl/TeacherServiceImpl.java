package com.ecut.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecut.dao.TeacherMapper;
import com.ecut.pojo.Teacher;
import com.ecut.service.TeacherService;

@Service
public class TeacherServiceImpl implements TeacherService {

	@Resource
	private TeacherMapper teacherMapper;
	
	@Override
	public int deleteByPrimaryKey(Long id) {
		int count = teacherMapper.deleteByPrimaryKey(id);
		return count;
	}

	@Override
	public int insert(Teacher record) {
		int count = teacherMapper.insert(record);
		return count;
	}

	@Override
	public int insertSelective(Teacher record) {
		int count = teacherMapper.insertSelective(record);
		return count;
	}

	@Override
	public Teacher selectByPrimaryKey(Long id) {
		Teacher teacher = teacherMapper.selectByPrimaryKey(id);
		return teacher;
	}

	@Override
	public int updateByPrimaryKeySelective(Teacher record) {
		int count = teacherMapper.updateByPrimaryKeySelective(record);
		return count;
	}

	@Override
	public int updateByPrimaryKey(Teacher record) {
		int count = teacherMapper.updateByPrimaryKey(record);
		return count;
	}

	@Override
	public List<Teacher> list(Teacher record) {
		List<Teacher> teacherList = teacherMapper.list(record);
		return teacherList;
	}

}
