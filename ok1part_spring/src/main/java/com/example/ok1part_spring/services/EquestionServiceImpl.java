package com.example.ok1part_spring.services;

import com.example.ok1part_spring.dto.request_json.PreRequestQuestionJson;
import com.example.ok1part_spring.dto.request_json.RequestQuestionJson;
import com.example.ok1part_spring.dto.request_json.objects.*;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.ComparisonObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.DependencyComparisonObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.FieldOptionObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.SubFieldObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.grand_childs.ComparisonConfigObject;
import com.example.ok1part_spring.dto.request_json.objects.child_classes.grand_childs.SubFieldConfigObject;
import com.example.ok1part_spring.models.*;
import com.example.ok1part_spring.repositories.*;
import com.example.ok1part_spring.utils.Counter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class EquestionServiceImpl implements EquestionService{
    private final EquestionRepository equestionRepository;
    private final DquestionRepository dquestionRepository;
    private final EquestionreasonRepository equestionreasonRepository;
    private final EquestiondepRepository equestiondepRepository;
    private final EqconfigrowRepository eqconfigrowRepository;
    private final EqconfigcolumnRepository eqconfigcolumnRepository;
    private final EquestionvalidationruleRepository equestionvalidationruleRepository;
    private final EqconfigoptionRepository eqconfigoptionRepository;
    private final EquestionconfigRepository equestionconfigRepository;
    private final EqconfigoutcomeRepository eqconfigoutcomeRepository;

    @Autowired
    public EquestionServiceImpl(EquestionRepository equestionRepository,
                                DquestionRepository dquestionRepository,
                                EquestionreasonRepository equestionreasonRepository,
                                EquestiondepRepository equestiondepRepository,
                                EqconfigrowRepository eqconfigrowRepository,
                                EqconfigcolumnRepository eqconfigcolumnRepository,
                                EquestionvalidationruleRepository equestionvalidationruleRepository,
                                EqconfigoptionRepository eqconfigoptionRepository,
                                EquestionconfigRepository equestionconfigRepository,
                                EqconfigoutcomeRepository eqconfigoutcomeRepository
                                ){
        this.equestionRepository = equestionRepository;
        this.dquestionRepository = dquestionRepository;
        this.eqconfigcolumnRepository = eqconfigcolumnRepository;
        this.eqconfigoptionRepository = eqconfigoptionRepository;
        this.eqconfigrowRepository = eqconfigrowRepository;
        this.equestionreasonRepository = equestionreasonRepository;
        this.equestiondepRepository = equestiondepRepository;
        this.equestionvalidationruleRepository = equestionvalidationruleRepository;
        this.equestionconfigRepository = equestionconfigRepository;
        this.eqconfigoutcomeRepository = eqconfigoutcomeRepository;
    }

    public Boolean delete(Equestion question) {
        List<Dquestion> dquestions = dquestionRepository.findAllByFkquestion(question);
        dquestionRepository.deleteAll(dquestions);

        List<Equestionreason> equestionreasons = equestionreasonRepository.findAllByFkquestion(question);
        equestionreasonRepository.deleteAll(equestionreasons);
        List<Equestiondep> equestiondepsparent = equestiondepRepository.findAllByFkparentquestion(question);
        equestiondepRepository.deleteAll(equestiondepsparent);
        List<Equestiondep> equestiondepschild = equestiondepRepository.findAllByFkdepquestion(question);
        equestiondepRepository.deleteAll(equestiondepschild);
        List<Eqconfigrow> rows = eqconfigrowRepository.findAllByFksubquestion(question);
        eqconfigrowRepository.deleteAll(rows);
        List<Eqconfigcolumn> column = eqconfigcolumnRepository.findAllByFksubquestion(question);
        eqconfigcolumnRepository.deleteAll(column);

        Equestionconfig questionConfig = question.getFkquestionconfig();

        List<Eqconfigrow> rows2 = eqconfigrowRepository.findAllByFkquestionconfigOrderByOrderFieldAsc(questionConfig);
        eqconfigrowRepository.deleteAll(rows2);
        List<Eqconfigcolumn> column2 = eqconfigcolumnRepository.findAllByFkquestionconfigOrderByOrderFieldAsc(questionConfig);
        eqconfigcolumnRepository.deleteAll(column2);


        List<Equestionvalidationrule> validationrules = equestionvalidationruleRepository.findAllByFkquestion(question);
        equestionvalidationruleRepository.deleteAll(validationrules);

        List<Eqconfigoption> configoptions = eqconfigoptionRepository.findAllByFkquestionconfig(questionConfig);
        eqconfigoptionRepository.deleteAll(configoptions);

        List<Equestionreason> questionreasons = equestionreasonRepository.findAllByFkquestion(question);
        equestionreasonRepository.deleteAll(questionreasons);

        equestionRepository.delete(question);

        List<Eqconfigoutcome> questionoutcomes = eqconfigoutcomeRepository.findAllByFkquestionconfig(questionConfig);
        eqconfigoutcomeRepository.deleteAll(questionoutcomes);
        if(questionConfig != null) equestionconfigRepository.delete(questionConfig);
        return true;
    }

    public Integer typeToInteger(String type) {
        return switch (type) {
            case "short-answer" -> 1;
            case "long-answer" -> 2;
            case "toggle-label" -> 3;
            case "radio" -> 4;
            case "radio-color" -> 5;
            case "select" -> 6;
            case "radio-image" -> 7;
            case "range" -> 8;
            case "slider" -> 9;
            case "slider-label" -> 10;
            case "scale" -> 11;
            case "multiple-checkbox" -> 12;
            case "grid-radio" -> 13;
            case "grid-checkbox" -> 14;
            case "grid-toggle" -> 15;
            case "grid-advanced" -> 16;
            case "date" -> 17;
            case "datetime" -> 18;
            case "checkbox" -> 19;
            default ->
                // throw new Error("Invalid type")
                    0;
        };
    }
    public String integerToType(Integer typeInInt){
        return switch (typeInInt) {
            case 1 -> "short-answer";
            case 2 -> "long-answer";
            case 3 -> "toggle-label";
            case 4 -> "radio";
            case 5 -> "radio-color";
            case 6 -> "select";
            case 7 -> "radio-image";
            case 8 -> "range";
            case 9 -> "slider";
            case 10 -> "slider-label";
            case 11 -> "scale";
            case 12 -> "multiple-checkbox";
            case 13 -> "grid-radio";
            case 14 -> "grid-checkbox";
            case 15 -> "grid-toggle";
            case 16 -> "grid-advanced";
            case 17 -> "date";
            case 18 -> "datetime";
            case 19 -> "checkbox";
            default ->
                // throw new Error("Invalid type")
                    "";
        };
    }

    public Short questionOutcomeComparisonTypeToShort (String type) {
        return switch (type) {
            case "exact" -> 1;
            case "minValue" -> 2;
            case "minValueEq" -> 3;
            case "maxValue" -> 4;
            case "maxValueEq" -> 5;
            case "percentMarginErrorInferior" -> 6;
            case "percentMarginErrorInferiorEq" -> 7;
            case "percentMarginErrorSuperior" -> 8;
            case "percentMarginErrorSuperiorEq" -> 9;
            case "toggleValue" -> 10;
            case "isChecked" -> 11;
            case "selectedOption" -> 12;
            default -> 0;
        };
    }
    public String questionOutcomeComparisonShortToType (Short typeInShort) {
        return switch (typeInShort) {
            case 1 -> "exact";
            case 2 -> "minValue";
            case 3 -> "minValueEq";
            case 4 -> "maxValue";
            case 5 -> "maxValueEq";
            case 6 -> "percentMarginErrorInferior";
            case 7 -> "percentMarginErrorInferiorEq";
            case 8 -> "percentMarginErrorSuperior";
            case 9 -> "percentMarginErrorSuperiorEq";
            case 10 -> "toggleValue";
            case 11 -> "isChecked";
            case 12 -> "selectedOption";
            default -> "";
        };
    }

    public Short questionDependencyComparisonTypeToShort (String type) {
        return switch (type) {
            case "exact" -> 1;
            case "minValue" -> 2;
            case "minValueEq" -> 3;
            case "maxValue" -> 4;
            case "maxValueEq" -> 5;
            case "percentMarginErrorInferior" -> 6;
            case "percentMarginErrorInferiorEq" -> 7;
            case "percentMarginErrorSuperior" -> 8;
            case "percentMarginErrorSuperiorEq" -> 9;
            case "toggleValue" -> 10;
            case "isChecked" -> 11;
            case "selectedOption" -> 12;
            default ->
                // throw new Error("Invalid type")
                    0;
        };
    }

    public String questionDependencyComparisonShortToType (Short typeInShort){
        return switch (typeInShort) {
            case 1 -> "exact";
            case 2 -> "minValue";
            case 3 -> "minValueEq";
            case 4 -> "maxValue";
            case 5 -> "maxValueEq";
            case 6 -> "percentMarginErrorInferior";
            case 7 -> "percentMarginErrorInferiorEq";
            case 8 -> "percentMarginErrorSuperior";
            case 9 -> "percentMarginErrorSuperiorEq";
            case 10 -> "toggleValue";
            case 11 -> "isChecked";
            case 12 -> "selectedOption";
            default -> "";
        };
    }
    public Integer questionValidationRuleToInteger(String type) {
        return switch (type) {
            case "exactLength" -> 1;
            case "minLength" -> 2;
            case "minLengthEq" -> 3;
            case "maxLength" -> 4;
            case "maxLengthEq" -> 5;
            case "minValue" -> 6;
            case "minValueEq" -> 7;
            case "maxValue" -> 8;
            case "maxValueEq" -> 9;
            case "exactValue" -> 10;
            case "regex" -> 11;
            default -> 0;
        };
    }
    public String questionIntegerToValidationRule (Integer typeInInt) {
        return switch (typeInInt) {
            case 1 -> "exactLength";
            case 2 -> "minLength";
            case 3 -> "minLengthEq";
            case 4 -> "maxLength";
            case 5 -> "maxLengthEq";
            case 6 -> "minValue";
            case 7 -> "minValueEq";
            case 8 -> "maxValue";
            case 9 -> "maxValueEq";
            case 10 -> "exactValue";
            case 11 -> "regex";
            default -> "";
        };
    }
    public Integer questionConfigTypeToInteger(String type) {
        return switch (type) {
            case "text" -> 1;
            case "integer" -> 2;
            case "decimal" -> 3;
            default ->
                // throw new Error("Invalid type")
                    0;
        };
    }

    public Integer getSubquestionType(Integer parentQuestionType){
        return switch (parentQuestionType) {
            case 13 -> 4;
            case 14 -> 19;
            case 15 -> 3;
            default ->
                // throw new Error("Invalid type")
                    0;
        };
    }

    public Eqconfigoption addQuestionConfigOption(Equestionconfig questionConfig, String id_, String optionValue,
                                                  Integer orderIndex){
        return addQuestionConfigOption(questionConfig, id_, optionValue, orderIndex, false);
    }

    public Eqconfigoption addQuestionConfigOption(Equestionconfig questionConfig, String id_, String optionValue,
                                                  Integer orderIndex, Boolean isImage){
        Eqconfigoption configOption = new Eqconfigoption();
        configOption.setIdField(id_);
        configOption.setFkquestionconfig(questionConfig);
        configOption.setOptionValue(optionValue);
        configOption.setOrderField(orderIndex);
        if(isImage) configOption.setIsImage(true);
        eqconfigoptionRepository.save(configOption);

        return configOption;
    }

    public Eqconfigrow addQuestionConfigRow(String id_, Equestionconfig questionConfig, String rowName, Integer rowOrderIndex,
                                            Equestion subquestion){
        Eqconfigrow configRow = new Eqconfigrow();
        configRow.setIdField(id_);
        configRow.setFkquestionconfig(questionConfig);
        configRow.setRowName(rowName);
        configRow.setOrderField(rowOrderIndex);
        configRow.setFksubquestion(subquestion);

        eqconfigrowRepository.saveAndFlush(configRow);

        return configRow;
    }

    public Eqconfigcolumn addQuestionConfigColumn(String id_, Equestionconfig questionConfig, String columnName,
                                                  Integer columnOrderIndex, Equestion subquestion){
        Eqconfigcolumn configColumn = new Eqconfigcolumn();
        configColumn.setIdField(id_);
        configColumn.setFkquestionconfig(questionConfig);
        configColumn.setColumnName(columnName);
        configColumn.setOrderField(columnOrderIndex);
        configColumn.setFksubquestion(subquestion);

        eqconfigcolumnRepository.saveAndFlush(configColumn);

        return configColumn;
    }

    public Eqconfigoutcome addQuestionOutcomeComparison(Equestionconfig questionConfig, Short comparisonType,
                                                        String comparisonValue, String secondaryComparisonValue){
        Eqconfigoutcome outcomeComparison = new Eqconfigoutcome();
        outcomeComparison.setFkquestionconfig(questionConfig);
        outcomeComparison.setComparisonType(comparisonType);
        outcomeComparison.setComparisonValue(comparisonValue);
        outcomeComparison.setComparisonSecondaryValue(secondaryComparisonValue);

        eqconfigoutcomeRepository.saveAndFlush(outcomeComparison);

        return outcomeComparison;
    }

    public Equestionreason addQuestionReasonRelationship(Equestion question, Ereason reason){
        Equestionreason questionReasonRelationship = new Equestionreason();
        questionReasonRelationship.setFkquestion(question);
        questionReasonRelationship.setFkreason(reason);

        equestionreasonRepository.saveAndFlush(questionReasonRelationship);

        return questionReasonRelationship;
    }

    public Equestiondep addQuestionDependency(Equestion parentQuestion, Equestion childQuestion, Short conditionType) {
        if(conditionType != 1 && conditionType != 2){
            // throw new Error("Should be using the other version of this function instead, the one which has extra
            // parameters for the comparison fields")
            return null;
        }

        Equestiondep questionDependency = new Equestiondep();
        questionDependency.setFkparentquestion(parentQuestion);
        questionDependency.setFkdepquestion(childQuestion);
        questionDependency.setConditionType(conditionType);
        equestiondepRepository.saveAndFlush(questionDependency);

        return questionDependency;
    }

    public Equestiondep addQuestionDependency(Equestion parentQuestion, Equestion childQuestion, Short conditionType,
                                              Short comparisonType, String comparisonValue, String comparisonSecondary) {
        Equestiondep questionDependency = new Equestiondep();
        questionDependency.setFkparentquestion(parentQuestion);
        questionDependency.setFkdepquestion(childQuestion);
        questionDependency.setComparisonType(comparisonType);
        questionDependency.setComparisonValue(comparisonValue);
        questionDependency.setComparisonSecondaryValue(comparisonSecondary);
        questionDependency.setConditionType(conditionType);
        equestiondepRepository.saveAndFlush(questionDependency);

        return questionDependency;
    }

    @Override
    public PreRequestQuestionJson getQuestionJson(Equestion question) {
        PreRequestQuestionJson questionJson = new PreRequestQuestionJson();

        questionJson.setId(question.getId());
        questionJson.setId_(question.getIdField());
        questionJson.setLabel(question.getLabel());
        questionJson.setType(integerToType(question.getType()));
        Boolean required = question.getRequired();
        questionJson.setRequired(required != null ? required : false);

        Short showQuestion = question.getShow_();

        if(showQuestion != null){
            switch (showQuestion) {
                case 1 -> questionJson.setShowQuestion("always");
                case 2 -> questionJson.setShowQuestion("conditions-met");
                case 3 -> questionJson.setShowQuestion("disabled");
                default -> questionJson.setShowQuestion("always");
            }
        } else {
            questionJson.setShowQuestion("always");
        }



        if(question.getReasons() != null){
            Equestionreason questionReasonRelationship = equestionreasonRepository.findFirstByFkquestion(question);
            if(questionReasonRelationship != null){
                Ereason reason = questionReasonRelationship.getFkreason();
                WorkflowConfigObject workflowConfig = new WorkflowConfigObject();
                workflowConfig.setReason(reason.getLabel());
                questionJson.setWorkflowConfig(workflowConfig);
            }
        }

        List<Equestionvalidationrule> validationRules = equestionvalidationruleRepository.findAllByFkquestion(question);
        if(!validationRules.isEmpty()){
            ValidationTypeObject[] rulesJson = validationRules.stream().map(validationRule -> {
                String ruleValue = validationRule.getRuleValue();
                String secValue = validationRule.getRuleSecondaryValue();
                String message = validationRule.getMessage();
                ValidationTypeObject validationTypeObject = new ValidationTypeObject();
                validationTypeObject.setName(questionIntegerToValidationRule(validationRule.getRuleType()));
                if(ruleValue != null){
                    validationTypeObject.setValue(ruleValue);
                }
                if(secValue != null){
                    validationTypeObject.setSecValue(secValue);
                }
                if(message != null){
                    validationTypeObject.setMessage(message);
                }
                return validationTypeObject;
            }).toArray(ValidationTypeObject[]::new);
            questionJson.setRules(rulesJson);
        }

        Equestionconfig questionConfig = question.getFkquestionconfig();
        FieldConfigObject fieldConfigJson = new FieldConfigObject();
        int changesOnFieldConfigCount = 0;
        if(questionConfig != null){
            String scaleStart = questionConfig.getScaleStart();
            String scaleEnd = questionConfig.getScaleEnd();
            String labelStart = questionConfig.getLabelStart();
            String labelEnd = questionConfig.getLabelEnd();
            Boolean showLabel = questionConfig.getShowLabel();
            Integer valueType = questionConfig.getValueType();
            Boolean options = questionConfig.getOptions();
            Boolean rows = questionConfig.getRows();
            Boolean columns = questionConfig.getColumns();

            if(scaleStart != null){
                fieldConfigJson.setScaleStart(Integer.parseInt(scaleStart));
                changesOnFieldConfigCount++;
            }
            if(scaleEnd != null){
                fieldConfigJson.setScaleEnd(Integer.parseInt(scaleEnd));
                changesOnFieldConfigCount++;
            }
            if(labelStart != null){
                fieldConfigJson.setLabelStart(labelStart);
                changesOnFieldConfigCount++;
            }
            if(labelEnd != null){
                fieldConfigJson.setLabelEnd(labelEnd);
                changesOnFieldConfigCount++;
            }
            if(showLabel != null && showLabel){
                fieldConfigJson.setShowLabel(showLabel);
                changesOnFieldConfigCount++;
            }
            // mode not implemented yet
            if(valueType != null){
                switch(valueType){
                    case 1 -> fieldConfigJson.setValueType("text");
                    case 2 -> fieldConfigJson.setValueType("integer");
                    case 3 -> fieldConfigJson.setValueType("decimal");
                    default -> {}
                }
                changesOnFieldConfigCount++;
            }
            if(options != null && options){
                List<Eqconfigoption> questionOptions = eqconfigoptionRepository.findAllByFkquestionconfigOrderByOrderFieldAsc(questionConfig);
                if(!questionOptions.isEmpty()){
                    FieldOptionObject[] optionsJson = questionOptions.stream().map(option -> {
                        FieldOptionObject optionJson = new FieldOptionObject();
                        optionJson.setId(option.getIdField());
                        optionJson.setLabel(option.getOptionValue());
                        return optionJson;
                    }).toArray(FieldOptionObject[]::new);
                    fieldConfigJson.setOptions(optionsJson);
                    changesOnFieldConfigCount++;
                }
            }
            if(rows != null && rows){
                List<Eqconfigrow> questionRows = eqconfigrowRepository.findAllByFkquestionconfigOrderByOrderFieldAsc(questionConfig);
                if(!questionRows.isEmpty()){
                    SubFieldObject[] rowsJson = questionRows.stream().map(row -> {
                        SubFieldObject rowJson = new SubFieldObject();
                        rowJson.setId(row.getIdField());
                        rowJson.setLabel(row.getRowName());
                        Equestion subquestion = row.getFksubquestion();
                        if(subquestion != null){
                            SubFieldConfigObject subfieldConfigJson = new SubFieldConfigObject();

                            rowJson.setType(integerToType(subquestion.getType()));
                            // rules for subquestions is not implemented yet
                            Equestionconfig subquestionConfig = subquestion.getFkquestionconfig();
                            if(subquestionConfig != null){
                                // for now, only options are implemented for subfield configs yet
                                if(subquestionConfig.getOptions()){
                                    List<Eqconfigoption> optionsFromRow = eqconfigoptionRepository.findAllByFkquestionconfigOrderByOrderFieldAsc(subquestionConfig);
                                    FieldOptionObject[] optionsFromRowJson = optionsFromRow.stream().map(optionFromRow -> {
                                        FieldOptionObject optionJson = new FieldOptionObject();
                                        optionJson.setId(optionFromRow.getIdField());
                                        optionJson.setLabel(optionFromRow.getOptionValue());
                                        return optionJson;
                                    }).toArray(FieldOptionObject[]::new);
                                    subfieldConfigJson.setOptions(optionsFromRowJson);
                                }
                            }
                            rowJson.setFieldConfig(subfieldConfigJson);
                        }
                        return rowJson;
                    }).toArray(SubFieldObject[]::new);
                    fieldConfigJson.setRows(rowsJson);
                    changesOnFieldConfigCount++;
                }
            }
            if(columns != null && columns){
                List<Eqconfigcolumn> questionColumns = eqconfigcolumnRepository.findAllByFkquestionconfigOrderByOrderFieldAsc(questionConfig);
                if(!questionColumns.isEmpty()){
                    SubFieldObject[] columnsJson = questionColumns.stream().map(row -> {
                        SubFieldObject columnJson = new SubFieldObject();
                        columnJson.setId(row.getIdField());
                        columnJson.setLabel(row.getColumnName());
                        Equestion subquestion = row.getFksubquestion();
                        if(subquestion != null){
                            SubFieldConfigObject subfieldConfigJson = new SubFieldConfigObject();
                            columnJson.setType(integerToType(subquestion.getType()));
                            // rules for subquestions and fieldconfig is not implemented yet for columns
                            // which means subquestions for columns are pretty useless right now
                            columnJson.setFieldConfig(subfieldConfigJson);
                        }
                        return columnJson;
                    }).toArray(SubFieldObject[]::new);
                    fieldConfigJson.setColumns(columnsJson);
                    changesOnFieldConfigCount++;
                }
            }




        }

        OutcomeConfigObject outcomeConfigJson = new OutcomeConfigObject();

        Integer continueField = question.getContinueField();
        outcomeConfigJson.setEndOnFail(continueField != null && question.getContinueField() == 0);

        if(questionConfig == null || questionConfig.getOutcomeSuccessMode() == null || questionConfig.getOutcomeSuccessMode() == 0){
            outcomeConfigJson.setSuccessMode("always");
        } else {
            outcomeConfigJson.setSuccessMode("comparison");
            List <Eqconfigoutcome> outcomeComparison = eqconfigoutcomeRepository.findAllByFkquestionconfig(questionConfig);
            if(outcomeComparison != null){
                ComparisonObject[] comparisonsJson = outcomeComparison.stream().map(comparison -> {
                    ComparisonObject comparisonJson = new ComparisonObject();
                    comparisonJson.setComparisonType(questionOutcomeComparisonShortToType(comparison.getComparisonType()));
                    ComparisonConfigObject comparisonConfigJson = new ComparisonConfigObject();
                    comparisonConfigJson.setComparisonValue(comparison.getComparisonValue());
                    comparisonConfigJson.setSecondaryValue(comparison.getComparisonSecondaryValue());
                    comparisonJson.setComparisonConfig(comparisonConfigJson);

                    return comparisonJson;
                }).toArray(ComparisonObject[]::new);
                outcomeConfigJson.setComparisons(comparisonsJson);
            }
        }
        questionJson.setOutcomeConfig(outcomeConfigJson);

        if(changesOnFieldConfigCount > 0) questionJson.setFieldConfig(fieldConfigJson);

        return questionJson;
        //qorder
    }

   public List<RequestQuestionJson> getQuestionJsonBulk(List<Equestion> questionsList) {
        Counter qorderIteratorIndex = new Counter();
        HashMap<Integer, Integer> idToUpdatedQuestionIndex = new HashMap<>();

        List<RequestQuestionJson> updatedQuestions = questionsList.stream().map(question -> {
            Integer qorder = question.getQorder();
            if(qorder != null && qorder == -1){ return null; }
            idToUpdatedQuestionIndex.put(question.getId(), qorderIteratorIndex.getCount());
            PreRequestQuestionJson questionJson = getQuestionJson(question);
            if(Objects.equals(questionJson.getShowQuestion(), "conditions-met")){
                List<Equestiondep> dependencies = equestiondepRepository.findAllByFkdepquestionId(questionJson.getId());
                if(dependencies != null && dependencies.size() > 0){
                    DependencyObject[] deps = dependencies.stream().map(dependency -> {
                        DependencyObject dep = new DependencyObject();
                        Short typeOfCondition = dependency.getConditionType();
                        switch (typeOfCondition) {
                            case 1 -> dep.setTypeOfCondition("parent-success");
                            case 2 -> dep.setTypeOfCondition("parent-fail");
                            case 3 -> dep.setTypeOfCondition("parent-compare");
                            default -> {}
                        }

                        if(typeOfCondition == 3){
                            DependencyComparisonObject depComparison = new DependencyComparisonObject();
                            depComparison.setType(questionDependencyComparisonShortToType(dependency.getComparisonType()));
                            depComparison.setComparisonValue(dependency.getComparisonValue());
                            depComparison.setSecondaryValue(dependency.getComparisonSecondaryValue());
                            dep.setComparison(depComparison);
                        }

                        dep.setQuestionIndex(idToUpdatedQuestionIndex.get(dependency.getFkparentquestion().getId()));

                        return dep;
                    }).toArray(DependencyObject[]::new);

                    questionJson.setDeps(deps);

                }
                return questionJson;
            }
            qorderIteratorIndex.increment();
            return questionJson;
        }).filter(Objects::nonNull).collect(Collectors.toList());

        return updatedQuestions;
    }
}
