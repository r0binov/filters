package com.test.filters.controller;

import com.test.filters.dto.CriteriaDTO;
import com.test.filters.exceptions.NotFoundException;
import com.test.filters.models.FilterCriteria;
import com.test.filters.service.FilterCriteriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/criteria")
public class FilterCriteriaController {
    private final FilterCriteriaService filterCriteriaService;

    @Autowired
    public FilterCriteriaController(FilterCriteriaService filterCriteriaService) {
        this.filterCriteriaService = filterCriteriaService;
    }
    @GetMapping(path = "/")
    public List<FilterCriteria> getAllFilterCriteria() {
        return filterCriteriaService.getAllFilterCriteria();
    }

    @GetMapping(path = "/{id}")
    public FilterCriteria getFilterCriteriaById(@PathVariable Long id) {
        return filterCriteriaService.getFilterCriteriaById(id)
                .orElseThrow(() -> new NotFoundException("Filter criteria not found with id: " + id));
    }

    @PostMapping(path = "/addCriteria")
    public FilterCriteria createFilterCriteria(@RequestBody CriteriaDTO criteriaDTO) {
        return filterCriteriaService.saveFilterCriteria(criteriaDTO);
    }

    @PutMapping (path = "/updateCriteria/{id}")
    public FilterCriteria updateFilterCriteria(@PathVariable Long id,@RequestBody CriteriaDTO criteriaDTO) {
        return filterCriteriaService.updateFilterCriteria(id, criteriaDTO);
    }

    @DeleteMapping(path = "/deleteCriteria/{id}")
    public void deleteFilterCriteria(@PathVariable Long id) {
        filterCriteriaService.deleteFilterCriteria(id);
    }
}
