package com.amirul.blackcoffer2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/data")
public class TrendsController {

    @Autowired
    private TrendsRepository trendsRepository;

    @GetMapping
    public List<Trends> getAllTrends() {
        return trendsRepository.findAll();
    }
}

