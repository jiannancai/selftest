package com.ecut.pojo;

import java.util.Date;

public class StudentCourse {
    private Long id;

    private String stuNumber;

    private String couNumber;

    private Date chooseTime;
    
    private String showTime;

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

    public String getCouNumber() {
        return couNumber;
    }

    public void setCouNumber(String couNumber) {
        this.couNumber = couNumber == null ? null : couNumber.trim();
    }

    public Date getChooseTime() {
        return chooseTime;
    }

    public void setChooseTime(Date chooseTime) {
        this.chooseTime = chooseTime;
    }

	public String getShowTime() {
		return showTime;
	}

	public void setShowTime(String showTime) {
		this.showTime = showTime;
	}
}