package com.ecut.pojo;

public class Student {
    private Long id;

    private String stuNumber;

    private String name;

    private String clazz;

    private String dsnumber;

    private String password;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStuNumber() {
        return stuNumber;
    }

    public void setStuNumber(String stuNumber) {
        this.stuNumber = stuNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getClazz() {
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz == null ? null : clazz.trim();
    }

    public String getDsnumber() {
        return dsnumber;
    }

    public void setDsnumber(String dsnumber) {
        this.dsnumber = dsnumber == null ? null : dsnumber.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}