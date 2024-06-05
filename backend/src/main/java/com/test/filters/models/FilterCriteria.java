package com.test.filters.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "filter_criteria")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FilterCriteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "criteriaType")
    private CriteriaType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "comparisonType")
    private ComparisonType comparisonType;

    @Column(name = "value")
    private String value;

    @ManyToOne
    @JoinColumn(name = "filter_id")
    @JsonBackReference
    private Filter filter;
}
