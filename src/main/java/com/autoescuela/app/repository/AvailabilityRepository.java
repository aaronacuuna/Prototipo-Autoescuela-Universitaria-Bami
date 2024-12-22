package com.autoescuela.app.repository;

import com.autoescuela.app.domain.Availability;
import com.autoescuela.app.domain.User;
import java.util.Set;
import org.springframework.data.repository.CrudRepository;

public interface AvailabilityRepository
    extends CrudRepository<Availability, Integer> {
    public Set<Availability> findAllByUser(User user);
}
