package com.example.ok1part_spring.services;

import com.example.ok1part_spring.dto.request_json.RequestQuestionJson;
import com.example.ok1part_spring.models.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EquestionService {
    Boolean delete(Equestion question);
    Integer typeToInteger(String type);
    String integerToType(Integer typeInInt);
    Integer questionValidationRuleToInteger(String type);
    String questionIntegerToValidationRule (Integer typeInInt);
    Integer questionConfigTypeToInteger(String type);
    Short questionOutcomeComparisonTypeToShort(String type);
    String questionOutcomeComparisonShortToType(Short type);
    Short questionDependencyComparisonTypeToShort(String type);
    String questionDependencyComparisonShortToType(Short type);
    Integer getSubquestionType(Integer parentQuestionType);
    Eqconfigoption addQuestionConfigOption(Equestionconfig questionConfig, String id_, String optionValue,
                                           Integer orderIndex);
    Eqconfigoption addQuestionConfigOption(Equestionconfig questionConfig, String id_, String optionValue,
                                           Integer orderIndex, Boolean isImage);
    Eqconfigrow addQuestionConfigRow(String id_, Equestionconfig questionConfig, String rowName, Integer rowOrderIndex,
                                     Equestion subquestion);
    Eqconfigoutcome addQuestionOutcomeComparison(Equestionconfig questionConfig, Short comparisonType,
                                                 String comparisonValue, String secondaryComparisonValue);
    Eqconfigcolumn addQuestionConfigColumn(String id_, Equestionconfig questionConfig, String columnName, Integer columnOrderIndex,
                                           Equestion subquestion);
    Equestionreason addQuestionReasonRelationship(Equestion question, Ereason reason);
    Equestiondep addQuestionDependency(Equestion parentQuestion, Equestion childQuestion, Short conditionType);
    Equestiondep addQuestionDependency(Equestion parentQuestion, Equestion childQuestion, Short conditionType,
                                       Short comparisonType, String comparisonValue, String comparisonSecondary);
    RequestQuestionJson getQuestionJson(Equestion question);
    List<RequestQuestionJson> getQuestionJsonBulk(List<Equestion> questionsList);
}
