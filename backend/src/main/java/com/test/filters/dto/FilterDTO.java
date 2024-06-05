package com.test.filters.dto;

import com.test.filters.models.ComparisonType;
import com.test.filters.models.CriteriaType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterDTO {
    private String name;
    private List<CriteriaDTO> criteria;
}
