package com.example.demo.dto.response;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@MappedSuperclass
public abstract class AbstractEntityResponse<T> {
    private T id;
    private T createdBy;
    private T updatedBy;
    private Date createdAt;
    private Date updatedAt;
}