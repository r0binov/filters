package com.test.filters.service;

import com.test.filters.dto.CriteriaDTO;
import com.test.filters.models.ComparisonType;
import com.test.filters.models.Filter;
import com.test.filters.models.FilterCriteria;
import com.test.filters.repository.FilterCriteriaRepository;
import com.test.filters.repository.FilterRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilterCriteriaService {
    private final FilterCriteriaRepository filterCriteriaRepository;
    private final FilterRepository filterRepository;

    @Autowired
    public FilterCriteriaService(FilterCriteriaRepository filterCriteriaRepository, FilterRepository filterRepository) {
        this.filterCriteriaRepository = filterCriteriaRepository;
        this.filterRepository = filterRepository;
    }

    public List<FilterCriteria> getAllFilterCriteria() {
        return filterCriteriaRepository.findAll();
    }

    public Optional<FilterCriteria> getFilterCriteriaById(Long id) {
        return filterCriteriaRepository.findById(id);
    }

    @Transactional
    public FilterCriteria saveFilterCriteria(CriteriaDTO criteriaDTO) {
        Filter filter = filterRepository.findById(criteriaDTO.getId())
                .orElseThrow(() -> new RuntimeException("Filter not found with id: " + criteriaDTO.getId()));

        FilterCriteria filterCriteria = new FilterCriteria();
        filterCriteria.setType(criteriaDTO.getType());
        filterCriteria.setComparisonType(criteriaDTO.getComparisonType());
        filterCriteria.setValue(criteriaDTO.getValue());
        filterCriteria.setFilter(filter);

        validateComparisonType(filterCriteria.getComparisonType());

        return filterCriteriaRepository.save(filterCriteria);
    }

    @Transactional
    public FilterCriteria updateFilterCriteria(Long id, CriteriaDTO updatedCriteriaDTO) {
        FilterCriteria existingFilterCriteria = filterCriteriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Filter criteria not found with id: " + id));

        existingFilterCriteria.setType(updatedCriteriaDTO.getType());
        existingFilterCriteria.setComparisonType(updatedCriteriaDTO.getComparisonType());
        existingFilterCriteria.setValue(updatedCriteriaDTO.getValue());

        validateComparisonType(existingFilterCriteria.getComparisonType());

        return filterCriteriaRepository.save(existingFilterCriteria);
    }

    @Transactional
    public void deleteFilterCriteria(Long id) {
        if (filterCriteriaRepository.existsById(id)) {
            filterCriteriaRepository.deleteById(id);
        }
    }

    private void validateComparisonType(ComparisonType comparisonType) {
        if (comparisonType == null) {
            throw new IllegalArgumentException("Comparison type cannot be null");
        }
        switch (comparisonType) {
            case MORE_THAN:
            case LESS_THAN:
            case EQUAL_TO:
            case FROM:
            case TO:
            case STARTS_WITH:
            case ENDS_WITH:
                break;
            default:
                throw new IllegalArgumentException("Invalid comparison type: " + comparisonType);
        }
    }
}

