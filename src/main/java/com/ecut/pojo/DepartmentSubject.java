package com.ecut.pojo;

public class DepartmentSubject {
    private Long id;

    private String dsnumber;

    private String department;

    private String subject;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDsnumber() {
        return dsnumber;
    }

    public void setDsnumber(String dsnumber) {
        this.dsnumber = dsnumber == null ? null : dsnumber.trim();
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department == null ? null : department.trim();
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject == null ? null : subject.trim();
    }
}