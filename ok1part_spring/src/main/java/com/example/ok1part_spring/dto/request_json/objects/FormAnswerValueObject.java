package com.example.ok1part_spring.dto.request_json.objects;

import com.example.ok1part_spring.dto.request_json.objects.child_classes.RowAnswerObject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class FormAnswerValueObject implements Serializable {
    String text;
    Float number;
    String date;
    String datetime;
    Boolean selected_toggle;
    String selected_slider;
    Boolean checkbox_is_checked;
    Boolean grid_is_checked;
    String selected_option;
    String selected_col;
    String selected_row;
    String[] multiple;
    RowAnswerObject[] rows;
}
