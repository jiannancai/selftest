package com.ecut.dao;

import java.util.List;

import com.ecut.pojo.StudentCourse;

public interface StudentCourseMapper {
    int deleteByPrimaryKey(Long id);

    int insert(StudentCourse record);

    int insertSelective(StudentCourse record);

    StudentCourse selectByPrimaryKey(Long id);

    List<StudentCourse> list(StudentCourse record);

    int updateByPrimaryKeySelective(StudentCourse record);

    int updateByPrimaryKey(StudentCourse record);
}