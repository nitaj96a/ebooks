package com.n96a.ebooks.lucene.model;

public class SimpleQuery {

    private String field;
    private String value;

    public SimpleQuery() {
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
