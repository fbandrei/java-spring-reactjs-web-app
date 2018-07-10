package com.symw.converters;

import javax.persistence.AttributeConverter;
import java.time.LocalDate;
import java.util.Date;

public class LocalDateAttributeConverter implements AttributeConverter<LocalDate, Date> {


    @Override
    public Date convertToDatabaseColumn(LocalDate localDate) {
        return null;
    }

    @Override
    public LocalDate convertToEntityAttribute(Date date) {
        return null;
    }
}
