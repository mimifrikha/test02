package myapp.repository;

import myapp.domain.Motcle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Motcle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MotcleRepository extends JpaRepository<Motcle, Long> {

}
