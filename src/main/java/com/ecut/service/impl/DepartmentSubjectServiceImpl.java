package com.ecut.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecut.dao.DepartmentSubjectMapper;
import com.ecut.pojo.DepartmentSubject;
import com.ecut.service.DepartmentSubjectService;

@Service
public class DepartmentSubjectServiceImpl implements DepartmentSubjectService {

	@Resource
	private DepartmentSubjectMapper departmentSubjectMapper;
	
	@Override
	public int deleteByPrimaryKey(Long id) {
		int count = departmentSubjectMapper.deleteByPrimaryKey(id);
		return count;
	}

	@Override
	public int insert(DepartmentSubject record) {
		int count = departmentSubjectMapper.insert(record);
		return count;
	}

	@Override
	public int insertSelective(DepartmentSubject record) {
		int count = departmentSubjectMapper.insertSelective(record);
		return count;
	}

	@Override
	public DepartmentSubject selectByPrimaryKey(Long id) {
		DepartmentSubject departmentSubject = departmentSubjectMapper.selectByPrimaryKey(id);
		return departmentSubject;
	}

	@Override
	public int updateByPrimaryKeySelective(DepartmentSubject record) {
		int count = departmentSubjectMapper.updateByPrimaryKeySelective(record);
		return count;
	}

	@Override
	public int updateByPrimaryKey(DepartmentSubject record) {
		int count = departmentSubjectMapper.updateByPrimaryKey(record);
		return count;
	}

	@Override
	public List<DepartmentSubject> list(DepartmentSubject record) {
		List<DepartmentSubject> departmentSubjectList = departmentSubjectMapper.list(record);
		return departmentSubjectList;
	}

}
