package com.ecut.service;

import java.util.List;

import com.ecut.pojo.Course;

public interface CourseService {
    int deleteByPrimaryKey(Long id);

    int insert(Course record);

    int insertSelective(Course record);

    Course selectByPrimaryKey(Long id);

    List<Course> list(Course record);

    int updateByPrimaryKeySelective(Course record);

    int updateByPrimaryKey(Course record);
}