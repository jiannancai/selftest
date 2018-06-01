package com.ecut.dao;

import java.util.List;

import com.ecut.pojo.DepartmentSubject;

public interface DepartmentSubjectMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DepartmentSubject record);

    int insertSelective(DepartmentSubject record);

    DepartmentSubject selectByPrimaryKey(Long id);

    List<DepartmentSubject> list(DepartmentSubject record);

    int updateByPrimaryKeySelective(DepartmentSubject record);

    int updateByPrimaryKey(DepartmentSubject record);
}