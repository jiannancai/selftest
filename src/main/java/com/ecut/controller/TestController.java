package com.ecut.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/testController")
public class TestController {

	@RequestMapping("/login")
	public ModelAndView test() {
		return new ModelAndView("/login");
	}
}
