package com.test.filters.repository;

import com.test.filters.models.FilterValues;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilterValuesRepository extends JpaRepository<FilterValues, Long> {
}
