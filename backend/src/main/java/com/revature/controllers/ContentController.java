package com.revature.controllers;


import org.springframework.web.bind.annotation.*;

@RestController
public class ContentController {


    @GetMapping("/home")
    public String handleHome() {
        return "home";
    }

    @GetMapping("/admin/home")
    public String handleAdmin() {
        return "admin-home";
    }

    @GetMapping("/user/home")
    public String handleUser() {
        return "user-home";
    }
}
