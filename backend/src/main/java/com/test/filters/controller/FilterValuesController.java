package com.test.filters.controller;

import com.test.filters.exceptions.NotFoundException;
import com.test.filters.models.FilterValues;
import com.test.filters.service.FilterValuesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path ="/api/values")
public class FilterValuesController {
    private final FilterValuesService filterValuesService;

    @Autowired
    public FilterValuesController(FilterValuesService filterValuesService) {
        this.filterValuesService = filterValuesService;
    }

    @GetMapping(path = "/")
    public List<FilterValues> getAllFilterValues() {
        return filterValuesService.getAllFilterValues();
    }

    @GetMapping(path = "/{id}")
    public FilterValues getFilterValuesById(@PathVariable Long id) {
        return filterValuesService.getFilterValuesById(id)
                .orElseThrow(() -> new NotFoundException("Filter values not found with id: " + id));
    }

    @PostMapping(path = "/addValue")
    public FilterValues createFilterValues(@RequestBody FilterValues filterValues) {
        return filterValuesService.saveFilterValues(filterValues);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteFilterValues(@PathVariable Long id) {
        filterValuesService.deleteFilterValue(id);
    }
}
