package myapp.web.rest;
import myapp.domain.Source;
import myapp.repository.SourceRepository;
import myapp.web.rest.errors.BadRequestAlertException;
import myapp.web.rest.util.HeaderUtil;
import myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Source.
 */
@RestController
@RequestMapping("/api")
public class SourceResource {

    private final Logger log = LoggerFactory.getLogger(SourceResource.class);

    private static final String ENTITY_NAME = "source";

    private final SourceRepository sourceRepository;

    public SourceResource(SourceRepository sourceRepository) {
        this.sourceRepository = sourceRepository;
    }

    /**
     * POST  /sources : Create a new source.
     *
     * @param source the source to create
     * @return the ResponseEntity with status 201 (Created) and with body the new source, or with status 400 (Bad Request) if the source has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sources")
    public ResponseEntity<Source> createSource(@Valid @RequestBody Source source) throws URISyntaxException {
        log.debug("REST request to save Source : {}", source);
        if (source.getId() != null) {
            throw new BadRequestAlertException("A new source cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Source result = sourceRepository.save(source);
        return ResponseEntity.created(new URI("/api/sources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sources : Updates an existing source.
     *
     * @param source the source to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated source,
     * or with status 400 (Bad Request) if the source is not valid,
     * or with status 500 (Internal Server Error) if the source couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sources")
    public ResponseEntity<Source> updateSource(@Valid @RequestBody Source source) throws URISyntaxException {
        log.debug("REST request to update Source : {}", source);
        if (source.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Source result = sourceRepository.save(source);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, source.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sources : get all the sources.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of sources in body
     */
    @GetMapping("/sources")
    public ResponseEntity<List<Source>> getAllSources(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Sources");
        Page<Source> page;
        if (eagerload) {
            page = sourceRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = sourceRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/sources?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /sources/:id : get the "id" source.
     *
     * @param id the id of the source to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the source, or with status 404 (Not Found)
     */
    @GetMapping("/sources/{id}")
    public ResponseEntity<Source> getSource(@PathVariable Long id) {
        log.debug("REST request to get Source : {}", id);
        Optional<Source> source = sourceRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(source);
    }

    /**
     * DELETE  /sources/:id : delete the "id" source.
     *
     * @param id the id of the source to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sources/{id}")
    public ResponseEntity<Void> deleteSource(@PathVariable Long id) {
        log.debug("REST request to delete Source : {}", id);
        sourceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
