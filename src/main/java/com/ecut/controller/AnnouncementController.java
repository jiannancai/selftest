package com.ecut.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.ecut.pojo.Announcement;
import com.ecut.service.AnnouncementService;

@Controller
@RequestMapping("/announcementController")
public class AnnouncementController {

	@Resource
	private AnnouncementService announcementService;

	@RequestMapping("/list")
	public ModelAndView list(@ModelAttribute("announcement") Announcement announcement) {
		List<Announcement> announcementList = announcementService.list(announcement);
		return new ModelAndView("/announcement/list").addObject("announcementList", announcementList);
	}

	@RequestMapping("/delete")
	@ResponseBody
	public Map<String, Object> delete(@RequestParam("id") Long id) {
		Map<String, Object> map = new HashMap<String, Object>();
		int count = announcementService.deleteByPrimaryKey(id);
		if (count != 0) {
			map.put("result", true);
		}else {
			map.put("result", false);
		}
		return map;
	}

	@RequestMapping("/getView")
	public ModelAndView getView(@RequestParam("id") Long id) {
		Announcement announcement = announcementService.selectByPrimaryKey(id);
		return new ModelAndView("/announcement/getView").addObject("announcement", announcement);
	}

	@RequestMapping("/manageView")
	public ModelAndView manageView(@RequestParam("id") Long id) {
		Announcement announcement = announcementService.selectByPrimaryKey(id);
		if(announcement == null) {
			announcement = new Announcement();
		}
		return new ModelAndView("/announcement/manage").addObject("announcement", announcement);
	}

	@RequestMapping("/manage")
	@ResponseBody
	public Map<String, Object> manage(@ModelAttribute("announcementMessage") String announcementMessage) {
		int count = 0;
		Map<String, Object> map = new HashMap<String, Object>();
		Announcement announcement = JSON.parseObject(announcementMessage, Announcement.class);
		if(announcement.getId() == null) {
			announcement.setCreateTime(new Date());
			announcement.setModifyTime(new Date());
			try {
				count = announcementService.insert(announcement);
				if(count > 0) {
					map.put("result", 1);
				}else {
					map.put("result", 0);
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}else {
			announcement.setModifyTime(new Date());
			try {
				count = announcementService.updateByPrimaryKeySelective(announcement);
				if(count > 0) {
					map.put("result", 2);
				}else {
					map.put("result", 0);
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		return map;
	}
}
