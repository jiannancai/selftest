package com.ecut.service;

import java.util.List;

import com.ecut.pojo.Announcement;

public interface AnnouncementService {
    int deleteByPrimaryKey(Long id);

    int insert(Announcement record);

    int insertSelective(Announcement record);

    Announcement selectByPrimaryKey(Long id);

    List<Announcement> list(Announcement record);

    int updateByPrimaryKeySelective(Announcement record);

    int updateByPrimaryKeyWithBLOBs(Announcement record);

    int updateByPrimaryKey(Announcement record);
}