package myapp.repository;

import myapp.domain.Source;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Source entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SourceRepository extends JpaRepository<Source, Long> {

    @Query(value = "select distinct source from Source source left join fetch source.motcles",
        countQuery = "select count(distinct source) from Source source")
    Page<Source> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct source from Source source left join fetch source.motcles")
    List<Source> findAllWithEagerRelationships();

    @Query("select source from Source source left join fetch source.motcles where source.id =:id")
    Optional<Source> findOneWithEagerRelationships(@Param("id") Long id);

}
