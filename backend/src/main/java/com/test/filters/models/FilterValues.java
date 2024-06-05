package com.test.filters.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "filter_values")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FilterValues {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "value_id")
    private Long id;

    @Column(name = "amount")
    private int amount;

    @Column(name = "title")
    private String title;

    @Column(name = "date")
    private Date date;
}
