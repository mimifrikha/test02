package myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Motcle.
 */
@Entity
@Table(name = "motcle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Motcle implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "etat", nullable = false)
    private String etat;

    @ManyToOne
    @JsonIgnoreProperties("motcles")
    private Notification notification;

    @ManyToMany(mappedBy = "motcles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Source> sources = new HashSet<>();

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

    public Motcle nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEtat() {
        return etat;
    }

    public Motcle etat(String etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Notification getNotification() {
        return notification;
    }

    public Motcle notification(Notification notification) {
        this.notification = notification;
        return this;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public Set<Source> getSources() {
        return sources;
    }

    public Motcle sources(Set<Source> sources) {
        this.sources = sources;
        return this;
    }

    public Motcle addSource(Source source) {
        this.sources.add(source);
        source.getMotcles().add(this);
        return this;
    }

    public Motcle removeSource(Source source) {
        this.sources.remove(source);
        source.getMotcles().remove(this);
        return this;
    }

    public void setSources(Set<Source> sources) {
        this.sources = sources;
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
        Motcle motcle = (Motcle) o;
        if (motcle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), motcle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Motcle{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", etat='" + getEtat() + "'" +
            "}";
    }
}
