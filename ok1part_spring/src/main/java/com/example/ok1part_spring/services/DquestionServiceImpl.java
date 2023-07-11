package com.example.ok1part_spring.services;

import com.example.ok1part_spring.dto.request_json.RequestFormAnswerQuestionJson;
import com.example.ok1part_spring.dto.request_json.objects.FormAnswerValueObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.RowAnswerObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.grand_childs.ColAnswerObject;
import com.example.ok1part_spring.models.*;
import com.example.ok1part_spring.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Service
public class DquestionServiceImpl implements DquestionService {
    private final EquestionRepository equestionRepository;
    private final DquestionRepository dquestionRepository;
    private final EqconfigoptionRepository eqconfigoptionRepository;
    private final EqconfigrowRepository eqconfigrowRepository;
    private final EqconfigcolumnRepository eqconfigcolumnRepository;
    private final DquestionvalueRepository dquestionvalueRepository;

    @Autowired
    public DquestionServiceImpl(EquestionRepository equestionRepository, DquestionRepository dquestionRepository, EqconfigoptionRepository eqconfigoptionRepository, EqconfigrowRepository eqconfigrowRepository, EqconfigcolumnRepository eqconfigcolumnRepository,
                                DquestionvalueRepository dquestionvalueRepository) {
        this.equestionRepository = equestionRepository;
        this.dquestionRepository = dquestionRepository;
        this.eqconfigoptionRepository = eqconfigoptionRepository;
        this.eqconfigrowRepository = eqconfigrowRepository;
        this.eqconfigcolumnRepository = eqconfigcolumnRepository;
        this.dquestionvalueRepository = dquestionvalueRepository;
    }

    public Dquestionvalue _fillDquestionValue(Dquestionvalue dquestionvalue, Integer type, FormAnswerValueObject value, Equestionconfig questionconfig){

        Integer value_type = questionconfig != null && questionconfig.getValueType() != null ? questionconfig.getValueType() : null;


        // short and long answer
        if (type == 1 || type == 2) {
            if (value_type != null && value_type == 2) {
                dquestionvalue.setInputedInteger(value.getNumber().intValue());
            } else if (value_type != null && value_type == 3) {
                dquestionvalue.setInputedDecimal(BigDecimal.valueOf(value.getNumber()));
            } else {
                dquestionvalue.setInputedText(value.getText());
            }
        }

        // toggle lable answer
        if (type == 3) {
            dquestionvalue.setSelectedToggleValue(value.getSelected_toggle());
        }

        // radio answers and select
        if ((type == 4 || type == 5 || type == 6 || type == 7) && questionconfig != null) {
            Eqconfigoption option = eqconfigoptionRepository.findFirstByFkquestionconfigAndIdField(questionconfig, value.getSelected_option());
            dquestionvalue.setFkselectedoption(option);
        }

        // range answer
        if (type == 8 && questionconfig != null) {
            if (value_type != null && value_type == 3) {
                dquestionvalue.setInputedDecimal(BigDecimal.valueOf(value.getNumber()));
            } else {
                dquestionvalue.setInputedInteger(value.getNumber().intValue());
            }
        }

        // slider answer
        if (type == 9) {
            dquestionvalue.setInputedInteger(value.getNumber().intValue());
        }

        // slider-label or scale answer
        if (type == 10 || type == 11) {
            Eqconfigcolumn column = eqconfigcolumnRepository.findFirstByFkquestionconfigAndOrderField(questionconfig, value.getNumber().intValue());
            dquestionvalue.setFkcol(column);
        }

        // date answer
        if (type == 17){
            dquestionvalue.setInputedDate(value.getDate());
        }

        // datetime answer
        if (type == 18){
            dquestionvalue.setInputedDate(value.getDatetime());
        }

        // checkbox answer
        if (type == 19){
            dquestionvalue.setCheckboxIschecked(value.getCheckbox_is_checked());
        }

        return dquestionvalue;
    }

    public Dquestion registerQuestionJson(RequestFormAnswerQuestionJson questionJson, Eform form, Dform formAnswer) {
        Dquestion questionAnswer = new Dquestion();

        Equestion equestion = equestionRepository.findFirstByFkformAndIdField(form, questionJson.getId());

        if (equestion == null) {
            return null;
        }

        Equestionconfig equestionconfig = equestion.getFkquestionconfig();

        questionAnswer.setFkforms(formAnswer);
        questionAnswer.setFkquestion(equestion);
        Boolean questionResult = questionJson.getResult();

        if(questionResult == null){
            // FIX this in the frontend
            questionAnswer.setResult(1);
        } else {
            questionAnswer.setResult(questionJson.getResult() ? 1 : 0);
        }

        dquestionRepository.saveAndFlush(questionAnswer);

        Integer type = equestion.getType();
        FormAnswerValueObject value = questionJson.getValue();

        if (value != null && type > 11 && type < 17) {
            // multiple checkbox answer
            if (type == 12) {
                String[] checkboxes = value.getMultiple();
                Arrays.stream(checkboxes).forEach(checkbox -> {
                    Dquestionvalue dquestionvalue = new Dquestionvalue();
                    _fillDquestionValue(dquestionvalue, 19, value, equestionconfig);
                    dquestionvalueRepository.save(dquestionvalue);
                });
            }

            if (type == 13 || type == 14 || type == 15 || type == 16) {
                RowAnswerObject[] rowsJson = value.getRows();
                Arrays.stream(rowsJson).forEach(rowJson -> {
                    Eqconfigrow selectedRow = eqconfigrowRepository.findFirstByFkquestionconfigAndIdField(equestionconfig, rowJson.getId());
                    if(selectedRow == null) return;
                    Equestion subQuestion = selectedRow.getFksubquestion();
                    Equestionconfig subQuestionConfig = subQuestion != null ? subQuestion.getFkquestionconfig() : null;
                    ColAnswerObject[] colsJson = rowJson.getCols();
                    Arrays.stream(colsJson).forEach(colJson -> {
                        Eqconfigcolumn selectedColumn = eqconfigcolumnRepository.findFirstByFkquestionconfigAndIdField(equestionconfig, colJson.getId());
                        if(selectedColumn == null) return;

                        Dquestionvalue dquestionvalue = new Dquestionvalue();
                        dquestionvalue.setFkquestion(questionAnswer);
                        FormAnswerValueObject cellValue = colJson.getValue();
                        if(cellValue == null) return;

                        if(type == 13){
                            dquestionvalue.setFkrow(selectedRow);
                            dquestionvalue.setFkcol(selectedColumn);
                            dquestionvalue.setGridIschecked(cellValue.getGrid_is_checked());
                            dquestionvalueRepository.save(dquestionvalue);
                        }

                        if(type == 14){
                            dquestionvalue.setFkrow(selectedRow);
                            dquestionvalue.setFkcol(selectedColumn);
                            dquestionvalue.setCheckboxIschecked(cellValue.getCheckbox_is_checked());
                            dquestionvalueRepository.save(dquestionvalue);
                        }

                        if(type == 15){
                            dquestionvalue.setFkrow(selectedRow);
                            dquestionvalue.setFkcol(selectedColumn);
                            dquestionvalue.setSelectedToggleValue(cellValue.getSelected_toggle());
                            dquestionvalueRepository.save(dquestionvalue);
                        }

                        if(type == 16){
                            Integer subquestionType = subQuestionConfig != null ? subQuestion.getType() : null;
                            if(subquestionType == null){
                                return;
                            }

                            dquestionvalue.setFkrow(selectedRow);
                            dquestionvalue.setFkcol(selectedColumn);

                            if(subquestionType == 1){
                                String valueJson = colJson.getValue() != null ? colJson.getValue().getText() : null;
                                Integer valueType = subQuestionConfig.getValueType();
                                if(valueType == 2 && valueJson != null){
                                    dquestionvalue.setInputedInteger(Integer.valueOf(valueJson));
                                } else if (valueType == 3 && valueJson != null){
                                    dquestionvalue.setInputedDecimal(BigDecimal.valueOf(Integer.parseInt(valueJson)));
                                } else if (valueJson != null){
                                    dquestionvalue.setInputedText(valueJson);
                                }
                            }

                            if(subquestionType == 3){
                                if(colJson.getValue().getCheckbox_is_checked()) dquestionvalue.setCheckboxIschecked(true);
                            }

                            if(subquestionType == 4){
                                if(colJson.getValue().getGrid_is_checked()) dquestionvalue.setGridIschecked(true);
                            }

                            if(subquestionType == 6){
                                String valueJson = colJson.getValue() != null ? colJson.getValue().getSelected_col() : null;
                                if(valueJson != null){
                                    Eqconfigoption selectedOption = eqconfigoptionRepository.findFirstByFkquestionconfigAndIdField(subQuestionConfig, valueJson);
                                    if(selectedOption != null){
                                        dquestionvalue.setFkselectedoption(selectedOption);
                                    }
                                }
                            }

                            if(subquestionType == 12){
                                if(colJson.getValue().getGrid_is_checked()) dquestionvalue.setCheckboxIschecked(true);
                            }

                            dquestionvalueRepository.save(dquestionvalue);
                        }
                    });
                });
            }

        } else if (value != null) {
            Dquestionvalue dquestionvalue = new Dquestionvalue();
            dquestionvalue.setFkquestion(questionAnswer);
            _fillDquestionValue(dquestionvalue, type, value, equestionconfig);
            dquestionvalueRepository.save(dquestionvalue);
        }

        return questionAnswer;
    }

    public List<Dquestion> registerQuestionJsonBulk(RequestFormAnswerQuestionJson[] questionsList, Eform form, Dform formAnswer) {
        List<Dquestion> savedQuestions = Arrays.stream(questionsList).map(questionAnswerJson -> {
            return registerQuestionJson(questionAnswerJson, form, formAnswer);
        }).toList();

        return savedQuestions;
    }
}
