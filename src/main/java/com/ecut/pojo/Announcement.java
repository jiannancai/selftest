package com.ecut.pojo;

import java.util.Date;

public class Announcement {
    private Long id;

    private String title;

    private Date createTime;

    private Date modifyTime;

    private String createShowTime;

    private String modifyShowTime;

    private String content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

	public String getCreateShowTime() {
		return createShowTime;
	}

	public void setCreateShowTime(String createShowTime) {
		this.createShowTime = createShowTime;
	}

	public String getModifyShowTime() {
		return modifyShowTime;
	}

	public void setModifyShowTime(String modifyShowTime) {
		this.modifyShowTime = modifyShowTime;
	}
    
}