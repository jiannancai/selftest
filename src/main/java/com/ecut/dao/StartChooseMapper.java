package com.ecut.dao;

import java.util.List;

import com.ecut.pojo.StartChoose;

public interface StartChooseMapper {
    int deleteByPrimaryKey(Long id);

    int insert(StartChoose record);

    int insertSelective(StartChoose record);

    StartChoose selectByPrimaryKey(Long id);

    List<StartChoose> list(StartChoose record);

    int updateByPrimaryKeySelective(StartChoose record);

    int updateByPrimaryKey(StartChoose record);
}