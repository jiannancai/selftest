package com.ecut.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecut.dao.AnnouncementMapper;
import com.ecut.pojo.Announcement;
import com.ecut.service.AnnouncementService;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {

	@Resource
	private AnnouncementMapper announcementMapper;
	
	@Override
	public int deleteByPrimaryKey(Long id) {
		int count = announcementMapper.deleteByPrimaryKey(id);
		return count;
	}

	@Override
	public int insert(Announcement record) {
		int count = announcementMapper.insert(record);
		return count;
	}

	@Override
	public int insertSelective(Announcement record) {
		int count = announcementMapper.insertSelective(record);
		return count;
	}

	@Override
	public Announcement selectByPrimaryKey(Long id) {
		Announcement announcement = announcementMapper.selectByPrimaryKey(id);
		return announcement;
	}

	@Override
	public int updateByPrimaryKeySelective(Announcement record) {
		int count = announcementMapper.updateByPrimaryKeySelective(record);
		return count;
	}

	@Override
	public int updateByPrimaryKeyWithBLOBs(Announcement record) {
		int count = announcementMapper.updateByPrimaryKeyWithBLOBs(record);
		return count;
	}

	@Override
	public int updateByPrimaryKey(Announcement record) {
		int count = announcementMapper.updateByPrimaryKey(record);
		return count;
	}

	@Override
	public List<Announcement> list(Announcement record) {
		List<Announcement> announcementList = announcementMapper.list(record);
		return announcementList;
	}

}
