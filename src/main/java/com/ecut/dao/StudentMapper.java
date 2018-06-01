package com.ecut.dao;

import java.util.List;

import com.ecut.pojo.Student;

public interface StudentMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Student record);

    int insertSelective(Student record);

    Student selectByPrimaryKey(Long id);

    List<Student> list(Student record);

    int updateByPrimaryKeySelective(Student record);

    int updateByPrimaryKey(Student record);
}