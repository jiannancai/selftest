package com.ecut.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecut.dao.StartChooseMapper;
import com.ecut.pojo.StartChoose;
import com.ecut.pojo.Teacher;
import com.ecut.service.StartChooseService;

@Service
public class StartChooseServiceImpl implements StartChooseService {

	@Resource
	private StartChooseMapper startChooseMapper;
	@Override
	public int deleteByPrimaryKey(Long id) {
		int count = startChooseMapper.deleteByPrimaryKey(id);
		return count;
	}

	@Override
	public int insert(StartChoose record) {
		int count = startChooseMapper.insert(record);
		return count;
	}

	@Override
	public int insertSelective(StartChoose record) {
		int count = startChooseMapper.insertSelective(record);
		return count;
	}

	@Override
	public StartChoose selectByPrimaryKey(Long id) {
		StartChoose startChoose = startChooseMapper.selectByPrimaryKey(id);
		return startChoose;
	}

	@Override
	public int updateByPrimaryKeySelective(StartChoose record) {
		int count = startChooseMapper.updateByPrimaryKeySelective(record);
		return count;
	}

	@Override
	public int updateByPrimaryKey(StartChoose record) {
		int count = startChooseMapper.updateByPrimaryKey(record);
		return count;
	}

	@Override
	public List<StartChoose> list(StartChoose record) {
		List<StartChoose> startChooseList = startChooseMapper.list(record);
		return startChooseList;
	}
}
