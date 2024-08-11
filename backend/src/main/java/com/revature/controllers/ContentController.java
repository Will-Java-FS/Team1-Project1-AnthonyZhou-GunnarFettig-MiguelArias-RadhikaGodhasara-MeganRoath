package com.revature.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContentController {

    @GetMapping("/home")
    public  String  handleHome(){
        return "home";
    }
    @GetMapping("/admin/home")
    public String handleAdminHome(){
        return "admin Home";
    }

    @GetMapping("/user/home")
    public String handleUserHome(){
        return "User HOme";
    }
}
