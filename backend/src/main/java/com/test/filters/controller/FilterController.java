package com.test.filters.controller;

import com.test.filters.dto.FilterDTO;
import com.test.filters.exceptions.NotFoundException;
import com.test.filters.models.Filter;
import com.test.filters.service.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping(path = "/api/filter")
public class FilterController {

    private final FilterService filterService;

    @Autowired
    public FilterController(FilterService filterService) {
        this.filterService = filterService;
    }

    @GetMapping(path = "/")
    public List<Filter> getAllFilter() {
        return filterService.getAllFilters();
    }

    @GetMapping(path = "/{id}")
    public Filter getFilterById(@PathVariable Long id) {
        return filterService.getFilterById(id)
                .orElseThrow(() -> new NotFoundException("Filter criteria not found with id: " + id));
    }

    @PostMapping(path = "/addFilter")
    public Filter createFilter(@RequestBody FilterDTO filterDTO) {
        return filterService.createFilter(filterDTO);
    }

    @PutMapping(path = "/updateFilter/{id}")
    public Filter updateFilter(@PathVariable Long id, @RequestBody FilterDTO filterDTO) {
        return filterService.updateFilter(id, filterDTO);
    }

    @DeleteMapping(path = "/deleteFilter/{id}")
    public void deleteFilter(@PathVariable Long id) {
        filterService.deleteFilter(id);
    }
}
