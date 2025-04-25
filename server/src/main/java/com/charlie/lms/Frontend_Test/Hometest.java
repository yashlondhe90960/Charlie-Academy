package com.charlie.lms.Frontend_Test;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Hometest {
	
@RequestMapping("/home")
public String getHome() {
	return "home" ;
}
}
