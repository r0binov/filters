package com.test.filters.dto;

import com.test.filters.models.ComparisonType;
import com.test.filters.models.CriteriaType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CriteriaDTO {
    private Long id;
    private ComparisonType comparisonType;
    private CriteriaType type;
    private String value;
}
