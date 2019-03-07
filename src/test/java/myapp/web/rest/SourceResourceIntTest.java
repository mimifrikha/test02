package myapp.web.rest;

import myapp.JhipsterSampleApplicationApp;

import myapp.domain.Source;
import myapp.repository.SourceRepository;
import myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SourceResource REST controller.
 *
 * @see SourceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class SourceResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_UML = "AAAAAAAAAA";
    private static final String UPDATED_UML = "BBBBBBBBBB";

    private static final String DEFAULT_DATA_HANDLER = "AAAAAAAAAA";
    private static final String UPDATED_DATA_HANDLER = "BBBBBBBBBB";

    @Autowired
    private SourceRepository sourceRepository;

    @Mock
    private SourceRepository sourceRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSourceMockMvc;

    private Source source;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SourceResource sourceResource = new SourceResource(sourceRepository);
        this.restSourceMockMvc = MockMvcBuilders.standaloneSetup(sourceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Source createEntity(EntityManager em) {
        Source source = new Source()
            .nom(DEFAULT_NOM)
            .uml(DEFAULT_UML)
            .dataHandler(DEFAULT_DATA_HANDLER);
        return source;
    }

    @Before
    public void initTest() {
        source = createEntity(em);
    }

    @Test
    @Transactional
    public void createSource() throws Exception {
        int databaseSizeBeforeCreate = sourceRepository.findAll().size();

        // Create the Source
        restSourceMockMvc.perform(post("/api/sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(source)))
            .andExpect(status().isCreated());

        // Validate the Source in the database
        List<Source> sourceList = sourceRepository.findAll();
        assertThat(sourceList).hasSize(databaseSizeBeforeCreate + 1);
        Source testSource = sourceList.get(sourceList.size() - 1);
        assertThat(testSource.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testSource.getUml()).isEqualTo(DEFAULT_UML);
        assertThat(testSource.getDataHandler()).isEqualTo(DEFAULT_DATA_HANDLER);
    }

    @Test
    @Transactional
    public void createSourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sourceRepository.findAll().size();

        // Create the Source with an existing ID
        source.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSourceMockMvc.perform(post("/api/sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(source)))
            .andExpect(status().isBadRequest());

        // Validate the Source in the database
        List<Source> sourceList = sourceRepository.findAll();
        assertThat(sourceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = sourceRepository.findAll().size();
        // set the field null
        source.setNom(null);

        // Create the Source, which fails.

        restSourceMockMvc.perform(post("/api/sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(source)))
            .andExpect(status().isBadRequest());

        List<Source> sourceList = sourceRepository.findAll();
        assertThat(sourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUmlIsRequired() throws Exception {
        int databaseSizeBeforeTest = sourceRepository.findAll().size();
        // set the field null
        source.setUml(null);

        // Create the Source, which fails.

        restSourceMockMvc.perform(post("/api/sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(source)))
            .andExpect(status().isBadRequest());

        List<Source> sourceList = sourceRepository.findAll();
        assertThat(sourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataHandlerIsRequired() throws Exception {
        int databaseSizeBeforeTest = sourceRepository.findAll().size();
        // set the field null
        source.setDataHandler(null);

        // Create the Source, which fails.

        restSourceMockMvc.perform(post("/api/sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(source)))
            .andExpect(status().isBadRequest());

        List<Source> sourceList = sourceRepository.findAll();
        assertThat(sourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSources() throws Exception {
        // Initialize the database
        sourceRepository.saveAndFlush(source);

        // Get all the sourceList
        restSourceMockMvc.perform(get("/api/sources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(source.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].uml").value(hasItem(DEFAULT_UML.toString())))
            .andExpect(jsonPath("$.[*].dataHandler").value(hasItem(DEFAULT_DATA_HANDLER.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllSourcesWithEagerRelationshipsIsEnabled() throws Exception {
        SourceResource sourceResource = new SourceResource(sourceRepositoryMock);
        when(sourceRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restSourceMockMvc = MockMvcBuilders.standaloneSetup(sourceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restSourceMockMvc.perform(get("/api/sources?eagerload=true"))
        .andExpect(status().isOk());

        verify(sourceRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllSourcesWithEagerRelationshipsIsNotEnabled() throws Exception {
        SourceResource sourceResource = new SourceResource(sourceRepositoryMock);
            when(sourceRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restSourceMockMvc = MockMvcBuilders.standaloneSetup(sourceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restSourceMockMvc.perform(get("/api/sources?eagerload=true"))
        .andExpect(status().isOk());

            verify(sourceRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getSource() throws Exception {
        // Initialize the database
        sourceRepository.saveAndFlush(source);

        // Get the source
        restSourceMockMvc.perform(get("/api/sources/{id}", source.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(source.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.uml").value(DEFAULT_UML.toString()))
            .andExpect(jsonPath("$.dataHandler").value(DEFAULT_DATA_HANDLER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSource() throws Exception {
        // Get the source
        restSourceMockMvc.perform(get("/api/sources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSource() throws Exception {
        // Initialize the database
        sourceRepository.saveAndFlush(source);

        int databaseSizeBeforeUpdate = sourceRepository.findAll().size();

        // Update the source
        Source updatedSource = sourceRepository.findById(source.getId()).get();
        // Disconnect from session so that the updates on updatedSource are not directly saved in db
        em.detach(updatedSource);
        updatedSource
            .nom(UPDATED_NOM)
            .uml(UPDATED_UML)
            .dataHandler(UPDATED_DATA_HANDLER);

        restSourceMockMvc.perform(put("/api/sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSource)))
            .andExpect(status().isOk());

        // Validate the Source in the database
        List<Source> sourceList = sourceRepository.findAll();
        assertThat(sourceList).hasSize(databaseSizeBeforeUpdate);
        Source testSource = sourceList.get(sourceList.size() - 1);
        assertThat(testSource.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testSource.getUml()).isEqualTo(UPDATED_UML);
        assertThat(testSource.getDataHandler()).isEqualTo(UPDATED_DATA_HANDLER);
    }

    @Test
    @Transactional
    public void updateNonExistingSource() throws Exception {
        int databaseSizeBeforeUpdate = sourceRepository.findAll().size();

        // Create the Source

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSourceMockMvc.perform(put("/api/sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(source)))
            .andExpect(status().isBadRequest());

        // Validate the Source in the database
        List<Source> sourceList = sourceRepository.findAll();
        assertThat(sourceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSource() throws Exception {
        // Initialize the database
        sourceRepository.saveAndFlush(source);

        int databaseSizeBeforeDelete = sourceRepository.findAll().size();

        // Delete the source
        restSourceMockMvc.perform(delete("/api/sources/{id}", source.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Source> sourceList = sourceRepository.findAll();
        assertThat(sourceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Source.class);
        Source source1 = new Source();
        source1.setId(1L);
        Source source2 = new Source();
        source2.setId(source1.getId());
        assertThat(source1).isEqualTo(source2);
        source2.setId(2L);
        assertThat(source1).isNotEqualTo(source2);
        source1.setId(null);
        assertThat(source1).isNotEqualTo(source2);
    }
}
