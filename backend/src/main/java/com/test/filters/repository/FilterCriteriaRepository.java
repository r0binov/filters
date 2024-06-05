package com.test.filters.repository;

import com.test.filters.models.FilterCriteria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilterCriteriaRepository extends JpaRepository<FilterCriteria, Long> {
}
