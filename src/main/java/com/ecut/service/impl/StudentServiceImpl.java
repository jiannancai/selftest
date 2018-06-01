package com.ecut.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecut.dao.StudentMapper;
import com.ecut.pojo.Student;
import com.ecut.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

	@Resource
	private StudentMapper studentMapper;
	
	@Override
	public int deleteByPrimaryKey(Long id) {
		int count = studentMapper.deleteByPrimaryKey(id);
		return count;
	}

	@Override
	public int insert(Student record) {
		int count = studentMapper.insert(record);
		return count;
	}

	@Override
	public int insertSelective(Student record) {
		int count = studentMapper.insert(record);
		return count;
	}

	@Override
	public Student selectByPrimaryKey(Long id) {
		Student teacher = studentMapper.selectByPrimaryKey(id);
		return teacher;
	}

	@Override
	public int updateByPrimaryKeySelective(Student record) {
		int count = studentMapper.updateByPrimaryKeySelective(record);
		return count;
	}

	@Override
	public int updateByPrimaryKey(Student record) {
		int count = studentMapper.updateByPrimaryKey(record);
		return count;
	}

	@Override
	public List<Student> list(Student record) {
		List<Student> studentList = studentMapper.list(record);
		return studentList;
	}

}
