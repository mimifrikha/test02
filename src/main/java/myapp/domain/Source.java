package myapp.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Source.
 */
@Entity
@Table(name = "source")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Source implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "uml", nullable = false)
    private String uml;

    @NotNull
    @Column(name = "data_handler", nullable = false)
    private String dataHandler;

    @OneToOne
    @JoinColumn(unique = true)
    private Notification notification;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "source_motcle",
               joinColumns = @JoinColumn(name = "source_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "motcle_id", referencedColumnName = "id"))
    private Set<Motcle> motcles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Source nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getUml() {
        return uml;
    }

    public Source uml(String uml) {
        this.uml = uml;
        return this;
    }

    public void setUml(String uml) {
        this.uml = uml;
    }

    public String getDataHandler() {
        return dataHandler;
    }

    public Source dataHandler(String dataHandler) {
        this.dataHandler = dataHandler;
        return this;
    }

    public void setDataHandler(String dataHandler) {
        this.dataHandler = dataHandler;
    }

    public Notification getNotification() {
        return notification;
    }

    public Source notification(Notification notification) {
        this.notification = notification;
        return this;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public Set<Motcle> getMotcles() {
        return motcles;
    }

    public Source motcles(Set<Motcle> motcles) {
        this.motcles = motcles;
        return this;
    }

    public Source addMotcle(Motcle motcle) {
        this.motcles.add(motcle);
        motcle.getSources().add(this);
        return this;
    }

    public Source removeMotcle(Motcle motcle) {
        this.motcles.remove(motcle);
        motcle.getSources().remove(this);
        return this;
    }

    public void setMotcles(Set<Motcle> motcles) {
        this.motcles = motcles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Source source = (Source) o;
        if (source.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), source.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Source{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", uml='" + getUml() + "'" +
            ", dataHandler='" + getDataHandler() + "'" +
            "}";
    }
}
