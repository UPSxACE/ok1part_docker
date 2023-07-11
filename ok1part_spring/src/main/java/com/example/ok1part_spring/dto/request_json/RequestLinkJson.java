package com.example.ok1part_spring.dto.request_json;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class RequestLinkJson implements Serializable {
    Integer id;
    String nameLink;
    String link;
    Integer formId;
}
