package com.example.demo.rest.word.model;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WordCreate {

    @NotNull
    Long groupId;

    @NotNull
    String name;

    String definition;
    Boolean done;
}