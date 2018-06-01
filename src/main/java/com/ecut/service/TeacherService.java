package com.ecut.service;

import java.util.List;

import com.ecut.pojo.Teacher;

public interface TeacherService {
    int deleteByPrimaryKey(Long id);

    int insert(Teacher record);

    int insertSelective(Teacher record);

    Teacher selectByPrimaryKey(Long id);

    List<Teacher> list(Teacher record);

    int updateByPrimaryKeySelective(Teacher record);

    int updateByPrimaryKey(Teacher record);
}