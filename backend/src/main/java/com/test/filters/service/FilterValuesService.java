package com.test.filters.service;

import com.test.filters.models.FilterValues;
import com.test.filters.repository.FilterValuesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilterValuesService {
    private final FilterValuesRepository filterValuesRepository;

    @Autowired
    public FilterValuesService(FilterValuesRepository filterValuesRepository) {
        this.filterValuesRepository = filterValuesRepository;
    }

    public List<FilterValues> getAllFilterValues() {
        return filterValuesRepository.findAll();
    }

    public Optional<FilterValues> getFilterValuesById(Long id) {
        return filterValuesRepository.findById(id);
    }

    public FilterValues saveFilterValues(FilterValues filterValues) {
        return filterValuesRepository.save(filterValues);
    }

    public void deleteFilterValue(Long id) {
        filterValuesRepository.deleteById(id);
    }
}
