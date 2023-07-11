package com.example.ok1part_spring.services;

import com.example.ok1part_spring.dto.request.RequestEformDto;
import com.example.ok1part_spring.dto.request_json.RequestLinkJson;
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
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EformServiceImpl implements EformService {
    private final EformRepository eformRepository;
    private final ReferenceService referenceService;
    private final EapprovalcycleService eapprovalcycleService;
    private final EqlinkRepository eqlinkRepository;
    private final EquestionRepository equestionRepository;
    private final EquestionService equestionService;
    private final EquestionconfigRepository equestionconfigRepository;
    private final EreasonRepository ereasonRepository;
    private final UserRepository userRepository;
    private final EquestionvalidationruleRepository equestionvalidationruleRepository;
    private final EquestionreasonRepository equestionreasonRepository;

    @Autowired
    public EformServiceImpl(EformRepository eformRepository, ReferenceService referenceService,
                            EapprovalcycleService eapprovalcycleService,EqlinkRepository eqlinkRepository,
                            EquestionRepository equestionRepository,EquestionService equestionService,
                            EquestionconfigRepository equestionconfigRepository,
                            EreasonRepository ereasonRepository,
                            UserRepository userRepository,
                            EquestionvalidationruleRepository equestionvalidationruleRepository,
                            EquestionreasonRepository equestionreasonRepository){
        this.eformRepository = eformRepository;
        this.referenceService = referenceService;
        this.eapprovalcycleService = eapprovalcycleService;
        this.eqlinkRepository = eqlinkRepository;
        this.equestionRepository = equestionRepository;
        this.equestionService = equestionService;
        this.equestionconfigRepository = equestionconfigRepository;
        this.ereasonRepository = ereasonRepository;
        this.userRepository = userRepository;
        this.equestionvalidationruleRepository = equestionvalidationruleRepository;
        this.equestionreasonRepository = equestionreasonRepository;
    }

    /***
     * This will return null if a client user is not found.
     * @param requestingUser
     * @return
     */
    private User _getClientUser(User requestingUser){
        User parentUser = requestingUser.getFkclient();
        if(parentUser == null){
            return requestingUser;
        }
        return parentUser;
    }

    private Eform _getFormByIdSafely(Integer formId, User clientUser){
        Optional<Eform> formQuery = eformRepository.findById(formId);
        if(formQuery.isEmpty()){
            //throw new Exception("Form not found");
            return null;
        }

        Eform form = formQuery.get();
        Optional<User> findFormOwner = userRepository.findById(form.getOwnerForm());
        if(findFormOwner.isEmpty()){
            return null;
        }
        User formOwner = findFormOwner.get();
        User fkClient = formOwner.getFkclient();
        User formClient = fkClient != null ? fkClient : formOwner;

        if(!Objects.equals(formClient.getId(), clientUser.getId())){
            //throw new Exception("Form from different client");
            return null;
        }

        return form;
    }


    public List<Eform> findAllByClientUser(User clientUser){
        List<Eform> formsFromUsersOfClientAndClient = new ArrayList<>();

        List<User> usersFromClient = userRepository.findAllByFkclientOrId(clientUser, clientUser.getId());

        usersFromClient.forEach(user -> {
            Eform formSearch = new Eform();
            formSearch.setOwnerForm(user.getId());
            List<Eform> formsFromUser = searchForm(user, formSearch);
            formsFromUsersOfClientAndClient.addAll(formsFromUser);
        });

        return formsFromUsersOfClientAndClient;
    }

    public List<Eform> searchForm(User user, Eform formSearch) {
        User clientUser = _getClientUser(user);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Example<Eform> formExample = Example.of(formSearch);
        List<Eform> formList = eformRepository.findAll(formExample).stream().filter(form -> {
            Optional<User> findFormOwner = userRepository.findById(form.getOwnerForm());
            if(findFormOwner.isEmpty()){
                return false;
            }
            User owner = findFormOwner.get();
            User fkclient = owner.getFkclient();
            return fkclient != null ? Objects.equals(fkclient.getId(), clientUser.getId()) :
                    Objects.equals(owner.getId(), clientUser.getId());
        }).toList();

        return formList;
    }

    public List<Equestion> getFormQuestionsByFormAndUser(Eform form, User requestingUser) {
        List<Equestion> currentQuestionsFromForm = equestionRepository.findAllByFkformOrderByFkparentquestionDesc(form);

        if(currentQuestionsFromForm == null){
            return null;
        }

        return currentQuestionsFromForm;
    }

    public Eform createFormByFamilyAndReferenceAndUser(String familyName, String referenceName, User requestingUser, String title, String description) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Reference reference = referenceService.findReferenceFamilyOnly(familyName, referenceName, requestingUser);

        if(reference == null){
            //throw new Exception("Reference not found");
            return null;
        }

        Eform newEform = new Eform();
        newEform.setTitle(title);
        newEform.setOwnerForm(requestingUser.getId());
        newEform.setState(1);
        newEform.setReference(reference);

        if(description != null){
            newEform.setDescription(description);
        }

        eformRepository.saveAndFlush(newEform);

        eapprovalcycleService.startNewCycleByFormAndUser(newEform, requestingUser);

        return newEform;
    }


    public Eform createFormByUapAndFamilyAndReferenceAndUser(String uapName, String familyName, String referenceName, User requestingUser, String title, String description) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Reference reference = referenceService.findReference(uapName, familyName, referenceName, requestingUser);

        if(reference == null){
            //throw new Exception("Reference not found");
            return null;
        }

        Eform newEform = new Eform();
        newEform.setTitle(title);
        newEform.setOwnerForm(requestingUser.getId());
        newEform.setState(1);
        newEform.setReference(reference);

        if(description != null){
            newEform.setDescription(description);
        }

        eformRepository.saveAndFlush(newEform);

        eapprovalcycleService.startNewCycleByFormAndUser(newEform, requestingUser);

        return newEform;
    }

    public Eform updateFormCommentsByFormAndUser(Eform form, String stringifiedCommentsJSON, User requestingUser) {
        boolean formAlreadyClosed = form.getState() != 2 && form.getState() != 1;
        if(formAlreadyClosed){
            return null;
        }

        Eapprovalcycle operatorInCycle = eapprovalcycleService.findOperatorInCycleByFormAndUser(form, requestingUser);
        boolean operatorNotInTheCycle = operatorInCycle == null;
        boolean isEditor = Objects.equals(form.getOwnerForm(), requestingUser.getId());
        if(operatorNotInTheCycle && !isEditor){
            return null;
        }

        String commentsFromForm = form.getComments();
        String comments = commentsFromForm != null ? commentsFromForm : "";

        boolean notBigger =  stringifiedCommentsJSON.length() <= comments.length();
        if(notBigger){
            return null;
        }

        form.setComments(stringifiedCommentsJSON);
        return eformRepository.save(form);
    }

    public Eform updateFormInfoByFormAndUser(Eform form, User requestingUser, Eform eformUpdates) {
        boolean isEditor = Objects.equals(form.getOwnerForm(), requestingUser.getId());
        if(!isEditor){
            return null;
        }

        String newTitle = eformUpdates.getTitle();
        String newDesc = eformUpdates.getDescription();
        String newDnumb = eformUpdates.getDnumber();
        String newDappr = eformUpdates.getDapproval();
        String newNotes = eformUpdates.getNotes();
        Integer newState = eformUpdates.getState();

        if(newTitle != null){
            form.setTitle(newTitle);
        }
        if(newDesc != null){
            form.setDescription(newDesc);
        }
        if(newDnumb != null){
            form.setDnumber(newDnumb);
        }
        if(newDappr != null){
            form.setDapproval(newDappr);
        }
        if(newNotes != null){
            form.setNotes(newNotes);
        }
        if(newState != null){
            form.setState(newState);
        }

        return eformRepository.save(form);
    }

    public List<Eqlink> updateFormLinksByFormIdAndUser(Integer formId, RequestLinkJson[] links, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Eform form = _getFormByIdSafely(formId, clientUser);

        if(form == null){
            //throw new Exception("Form not found");
            return null;
        }

        List<Eqlink> linksToDelete = eqlinkRepository.findAllByFkforms(form);
        eqlinkRepository.deleteAll(linksToDelete);

        List<Eqlink> newLinks =  Arrays.stream(links).map(link -> {
            Eqlink newLink = new Eqlink();
            newLink.setLink(link.getLink());
            newLink.setNameLink(link.getNameLink());
            newLink.setFkforms(form);
            return eqlinkRepository.saveAndFlush(newLink);
        }).collect(Collectors.toList());

        return newLinks;
    }

    public List<Equestion> updateFormQuestionsByFormAndUser(Eform form, RequestQuestionJson[] questionsJson,
                                                              User requestingUser) {

        boolean isEditor = Objects.equals(form.getOwnerForm(), requestingUser.getId());
        Integer formState = form.getState();
        boolean isInApprovalOrCreationState = formState == 1 || formState == 2;
        if(!isEditor || !isInApprovalOrCreationState){
            return null;
        }

        List<Equestion> currentQuestionsFromForm = equestionRepository.findAllByFkformOrderByFkparentquestionDesc(form);
        currentQuestionsFromForm.forEach(equestion -> equestionService.delete(equestion));

        Counter qorderIteratorIndex = new Counter();
        HashMap<Integer, Equestion> indexToUpdatedQuestion = new HashMap<>();
        Arrays.stream(questionsJson).forEach(questionJson -> {
            // Equestion

            Equestion question = new Equestion(questionJson.getId_(), form, qorderIteratorIndex.getCount(),
                    questionJson.getLabel(), equestionService.typeToInteger(questionJson.getType()));

            WorkflowConfigObject workflowConfig = questionJson.getWorkflowConfig();
            Object reasonObj = workflowConfig != null ? workflowConfig.getReason() : null;
            String reasonString = reasonObj != null ? reasonObj.toString() : null;
            Ereason reason = !Objects.equals(reasonString, "false") ? ereasonRepository.findFirstByLabelAndFkclient(reasonString, _getClientUser(requestingUser)) : null;
            String show = questionJson.getShowQuestion();
            if(reason != null){
                question.setReasons(true);
            }

            Boolean required = questionJson.getRequired();
            if(required != null && required == true){
                question.setRequired(true);
            }

            OutcomeConfigObject outcomeConfigObject = questionJson.getOutcomeConfig();
            Boolean endOnFail = outcomeConfigObject != null ? outcomeConfigObject.getEndOnFail() : null;
            if(endOnFail != null && endOnFail == true){
                question.setContinueField(0);
            }

            if(show != null){
                if(show.equals("always")){
                    question.setShow_((short)1);
                }
                if(show.equals("conditions-met")){
                    question.setShow_((short)2);
                }
                if(show.equals("disabled")){
                    question.setShow_((short)3);
                }
            }

            // save Equestion
            equestionRepository.saveAndFlush(question);

            // equestion reason
            if(reason != null){
                Equestionreason questionreasonRelationship = new Equestionreason();
                questionreasonRelationship.setFkreason(reason);
                questionreasonRelationship.setFkquestion(question);
                equestionreasonRepository.save(questionreasonRelationship);
            }

            // Validation rules
            ValidationTypeObject[] validationRules = questionJson.getRules();
            if(validationRules != null){
                Arrays.stream(validationRules).forEach(validationRule -> {
                    Object validationRuleValue = validationRule.getValue();
                    Object validationRuleSecValue = validationRule.getSecValue();

                    Equestionvalidationrule validationRuleModel = new Equestionvalidationrule();
                    validationRuleModel.setFkquestion(question);
                    validationRuleModel.setRuleType(equestionService.questionValidationRuleToInteger(validationRule.getName()));
                    validationRuleModel.setRuleValue(validationRuleValue != null ? validationRuleValue.toString() : null);
                    validationRuleModel.setRuleSecondaryValue(validationRuleSecValue != null ? validationRuleSecValue.toString() : null);
                    validationRuleModel.setMessage(validationRule.getMessage());
                    equestionvalidationruleRepository.save(validationRuleModel);
                });
            }

            // Equestionconfig (part 1)

            FieldConfigObject fieldConfigObject = questionJson.getFieldConfig();
            Equestionconfig equestionconfig = new Equestionconfig();
            String successMode = outcomeConfigObject != null ? outcomeConfigObject.getSuccessMode() : "always";
            boolean isComparison = Objects.equals(successMode, "comparison");

            if(fieldConfigObject != null || isComparison){

                if(isComparison) equestionconfig.setOutcomeSuccessMode(1);

                if(fieldConfigObject != null) {

                    // mode field is not implemented yet

                    Object scaleStart = fieldConfigObject.getScaleStart();
                    Object scaleEnd = fieldConfigObject.getScaleEnd();

                    equestionconfig.setScaleStart(scaleStart != null ? scaleStart.toString() : null);
                    equestionconfig.setScaleEnd(scaleStart != null ? scaleEnd.toString() : null);
                    equestionconfig.setLabelStart(fieldConfigObject.getLabelStart());
                    equestionconfig.setLabelEnd(fieldConfigObject.getLabelEnd());
                    equestionconfig.setShowLabel(fieldConfigObject.getShowLabel());

                    String valueType = fieldConfigObject.getValueType();
                    if (valueType != null) {
                        equestionconfig.setValueType(equestionService.questionConfigTypeToInteger(valueType));
                    }
                }

                equestionconfigRepository.saveAndFlush(equestionconfig);

                // Outcome Success Mode Comparisons
                if(isComparison && outcomeConfigObject != null){
                    ComparisonObject[] comparisons = outcomeConfigObject.getComparisons();
                    if(comparisons != null && comparisons.length > 0){
                        Arrays.stream(comparisons).forEach(comparison -> {
                            ComparisonConfigObject comparisonConfig = comparison.getComparisonConfig();
                            String comparisonValue = comparisonConfig != null && comparisonConfig.getComparisonValue() != null ?
                                    comparisonConfig.getComparisonValue().toString() : null;
                            String comparisonSecValue = comparisonConfig != null && comparisonConfig.getSecondaryValue() != null ?
                                    comparisonConfig.getSecondaryValue().toString() : null;

                            equestionService.addQuestionOutcomeComparison(equestionconfig,
                                    equestionService.questionOutcomeComparisonTypeToShort(comparison.getComparisonType()),
                                    comparisonValue, comparisonSecValue);
                        });
                    }
                }
            }

            // save Equestion

            equestionRepository.saveAndFlush(question);


            // set reasons
            if(reason != null){
                equestionService.addQuestionReasonRelationship(question, reason);
            }

            // Equestionconfig (part 2)

            if(fieldConfigObject != null || isComparison) {

                Integer questionType = question.getType();

                // radio questions and select questions
                if (questionType == 4 || questionType == 5 || questionType == 6 || questionType == 7) {
                    FieldOptionObject[] options = fieldConfigObject.getOptions();

                    if (options != null && options.length > 0) {
                        Counter configOptionIteratorIndex = new Counter();
                        Arrays.stream(options).forEach((option) -> {
                            equestionService.addQuestionConfigOption(equestionconfig, option.getId(), option.getLabel(),
                                    configOptionIteratorIndex.getCount(), questionType == 7);
                            configOptionIteratorIndex.increment();
                        });
                        equestionconfig.setOptions(true); // will be saved later
                    }
                }

                // normal grid questions
                if (questionType == 13 || questionType == 14 || questionType == 15) {
                    SubFieldObject[] rows = fieldConfigObject.getRows();
                    if (rows != null && rows.length > 0) {
                        Counter rowIteratorIndex = new Counter();
                        Arrays.stream(rows).forEach(row -> {
                            Equestion subquestion = new Equestion(row.getId(), form, -1, row.getLabel(),
                                    equestionService.getSubquestionType(questionType));
                            equestionRepository.saveAndFlush(subquestion);
                            equestionService.addQuestionConfigRow(row.getId(), equestionconfig, row.getLabel(),
                                    rowIteratorIndex.getCount(), subquestion);

                            SubFieldConfigObject rowConfigObject = row.getFieldConfig();
                            if(rowConfigObject != null){
                                // for now only options is implemented yet
                                FieldOptionObject[] rowOptions = rowConfigObject.getOptions();
                                if(rowOptions != null){
                                    Counter rowOrderCounter = new Counter();
                                    Arrays.stream(rowOptions).forEach(option -> {
                                        Equestionconfig subquestionConfig = new Equestionconfig();
                                        subquestionConfig.setOptions(true);
                                        equestionconfigRepository.save(subquestionConfig);
                                        subquestion.setFkquestionconfig(subquestionConfig);
                                        equestionRepository.saveAndFlush(subquestion);
                                        equestionService.addQuestionConfigOption(subquestionConfig, option.getId(),
                                                option.getLabel(), rowOrderCounter.getCount());
                                        rowOrderCounter.increment();
                                    });
                                }
                            }

                            rowIteratorIndex.increment();
                        });
                        equestionconfig.setRows(true);
                    }

                    SubFieldObject[] columns = fieldConfigObject.getColumns();
                    if (columns != null && columns.length > 0) {
                        Counter columnIteratorIndex = new Counter();
                        Arrays.stream(columns).forEach(column -> {
                           equestionService.addQuestionConfigColumn(column.getId(), equestionconfig, column.getLabel(),
                                   columnIteratorIndex.getCount(), null);
                            columnIteratorIndex.increment();
                        });
                        equestionconfig.setColumns(true);
                    }
                }

                // advanced grid
                if(questionType == 16){
                    SubFieldObject[] rows = fieldConfigObject.getRows();
                    if (rows != null && rows.length > 0) {
                        Counter rowIteratorIndex = new Counter();
                        Arrays.stream(rows).forEach(row -> {
                            Equestion subquestion = new Equestion(row.getId(), form, -1, row.getLabel(),
                                    equestionService.questionConfigTypeToInteger(row.getType()));
                            equestionRepository.saveAndFlush(subquestion);
                            equestionService.addQuestionConfigRow(row.getId(), equestionconfig, row.getLabel(),
                                    rowIteratorIndex.getCount(), subquestion);
                            rowIteratorIndex.increment();
                        });
                        equestionconfig.setRows(true);
                    }

                    SubFieldObject[] columns = fieldConfigObject.getColumns();
                    if (columns != null && columns.length > 0) {
                        Counter columnIteratorIndex = new Counter();
                        Arrays.stream(columns).forEach(column -> {
                            equestionService.addQuestionConfigColumn(column.getId(), equestionconfig, column.getLabel(),
                                    columnIteratorIndex.getCount(), null);
                            columnIteratorIndex.increment();
                        });
                        equestionconfig.setColumns(true);
                    }
                }

                // save equestionconfig options (options, rows, and columns field value might have changed by this point)
                equestionconfigRepository.saveAndFlush(equestionconfig);
                question.setFkquestionconfig(equestionconfig);
                equestionRepository.saveAndFlush(question);

            }



            // Dependencies
            DependencyObject[] dependencies = questionJson.getDeps();
            if(dependencies != null && dependencies.length > 0){
                Arrays.stream(dependencies).forEach(dependency -> {
                    Integer parentQuestionIndex = dependency.getQuestionIndex();
                    Equestion parentQuestion = indexToUpdatedQuestion.get(parentQuestionIndex);
                    if(parentQuestion != null){
                        String typeOfCondition = dependency.getTypeOfCondition();
                        DependencyComparisonObject comparison = dependency.getComparison();
                        String comparisonValue = comparison != null && comparison.getComparisonValue() != null ? comparison.getComparisonValue().toString(): null;
                        String comparisonSecValue = comparison != null && comparison.getSecondaryValue() != null ?
                                comparison.getSecondaryValue().toString() : null;
                        if(Objects.equals(typeOfCondition, "parent-success")){
                            equestionService.addQuestionDependency(parentQuestion, question, (short)1);
                        }
                        if(Objects.equals(typeOfCondition, "parent-fail")){
                            equestionService.addQuestionDependency(parentQuestion, question, (short)2);
                        }
                        if(Objects.equals(typeOfCondition, "parent-compare") && comparison != null){
                            equestionService.addQuestionDependency(parentQuestion, question, (short)3,
                                    equestionService.questionDependencyComparisonTypeToShort(comparison.getType()),
                                    comparisonValue, comparisonSecValue);
                        }
                    }
                });
            }

            indexToUpdatedQuestion.put(qorderIteratorIndex.getCount(), question);
            qorderIteratorIndex.increment();
        });


        return new ArrayList<>(indexToUpdatedQuestion.values());
    }

   public Eform findFormByIdAndUser(Integer formId, User requestingUser) {
        User clientUser = _getClientUser(requestingUser);

        if(clientUser == null){
            //throw new Exception("Client user not found");
            return null;
        }

        Eform form = _getFormByIdSafely(formId, clientUser);

        if(form == null){
            //throw new Exception("Form not found");
            return null;
        }

        return form;
    }


}
