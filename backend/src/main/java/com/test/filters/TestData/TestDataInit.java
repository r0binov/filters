package com.test.filters.TestData;

import com.test.filters.models.*;
import com.test.filters.repository.FilterCriteriaRepository;
import com.test.filters.repository.FilterRepository;
import com.test.filters.repository.FilterValuesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TestDataInit implements CommandLineRunner {
    private final FilterValuesRepository filterValuesRepository;
    private final FilterCriteriaRepository filterCriteriaRepository;
    private final FilterRepository filterRepository;

    @Autowired
    public TestDataInit(FilterValuesRepository filterValuesRepository, FilterCriteriaRepository filterCriteriaRepository, FilterRepository filterRepository) {
        this.filterValuesRepository = filterValuesRepository;
        this.filterCriteriaRepository = filterCriteriaRepository;
        this.filterRepository = filterRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        addTestData();
    }

    private void addTestData() {
        // Test data 1
        Filter filter = new Filter();
        filter.setName("Filter1");
        filterRepository.save(filter);

        FilterCriteria filterCriteria1 = new FilterCriteria();
        filterCriteria1.setComparisonType(ComparisonType.MORE_THAN);
        filterCriteria1.setFilter(filter);
        filterCriteria1.setType(CriteriaType.AMOUNT);
        filterCriteria1.setValue("4");
        filterCriteriaRepository.save(filterCriteria1);

        FilterValues filterValue1 = new FilterValues();
        filterValue1.setAmount(100);
        filterValue1.setTitle("Filter Value 1");
        filterValue1.setDate(new Date());
        filterValuesRepository.save(filterValue1);

        // Test data 2
        Filter filter2 = new Filter();
        filter2.setName("Filter2");
        filterRepository.save(filter2);

        FilterCriteria filterCriteria2 = new FilterCriteria();
        filterCriteria2.setComparisonType(ComparisonType.STARTS_WITH);
        filterCriteria2.setFilter(filter2);
        filterCriteria2.setType(CriteriaType.TITLE);
        filterCriteria2.setValue("F");
        filterCriteriaRepository.save(filterCriteria2);

        FilterValues filterValue2 = new FilterValues();
        filterValue2.setAmount(200);
        filterValue2.setTitle("Filter Value 2");
        filterValue2.setDate(new Date());
        filterValuesRepository.save(filterValue2);
    }
}
