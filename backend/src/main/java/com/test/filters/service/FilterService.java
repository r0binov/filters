package com.test.filters.service;

import com.test.filters.dto.CriteriaDTO;
import com.test.filters.dto.FilterDTO;
import com.test.filters.exceptions.NotFoundException;
import com.test.filters.models.Filter;
import com.test.filters.models.FilterCriteria;
import com.test.filters.repository.FilterCriteriaRepository;
import com.test.filters.repository.FilterRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FilterService {
    private final FilterRepository filterRepository;
    private final FilterCriteriaRepository filterCriteriaRepository;

    @Autowired
    public FilterService(FilterRepository filterRepository, FilterCriteriaRepository filterCriteriaRepository) {
        this.filterRepository = filterRepository;
        this.filterCriteriaRepository = filterCriteriaRepository;
    }

    public List<Filter> getAllFilters() {
        return filterRepository.findAll();
    }

    public Optional<Filter> getFilterById(Long id) {
        return filterRepository.findById(id);
    }

    @Transactional
    public Filter createFilter(FilterDTO filterDTO) {
        Filter filter = new Filter();
        filter.setName(filterDTO.getName());
        filter.setCriteria(new ArrayList<>());

        getCriteria(filterDTO, filter);

        // Save the filter entity
        filter = filterRepository.save(filter);

        // Fetch the saved filter entity to ensure IDs are set
        filter = filterRepository.findById(filter.getId()).orElse(null);

        return filter;
    }

    @Transactional
    public Filter updateFilter(Long id, FilterDTO filterDTO) {
        Optional<Filter> optionalFilter = filterRepository.findById(id);
        if (optionalFilter.isEmpty()) {
            throw new NotFoundException("Filter not found with id: " + id);
        }
        Filter existingFilter = optionalFilter.get();

        existingFilter.setName(filterDTO.getName());

        existingFilter.getCriteria().clear();
        getCriteria(filterDTO, existingFilter);

        return filterRepository.save(existingFilter);
    }

    private void getCriteria(FilterDTO filterDTO, Filter existingFilter) {
        if (filterDTO.getCriteria() != null) {
            for (CriteriaDTO criteriaDTO : filterDTO.getCriteria()) {
                FilterCriteria filterCriteria = new FilterCriteria();
                filterCriteria.setType(criteriaDTO.getType());
                filterCriteria.setComparisonType(criteriaDTO.getComparisonType());
                filterCriteria.setValue(criteriaDTO.getValue());
                filterCriteria.setFilter(existingFilter);
                existingFilter.getCriteria().add(filterCriteria);
            }
        }
    }

    @Transactional
    public void deleteFilter(Long id) {
        Optional<Filter> filterOptional = filterRepository.findById(id);
        if (filterOptional.isPresent()) {
            filterRepository.deleteById(id);
        }
    }

}
