package com.symw.repository;

import com.symw.entity.Payee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayeeRepository extends CrudRepository<Payee, Long> {

    Iterable<Payee> findAllByUserId(Long id);
    Payee findByNameAndUserId(String name, Long id);
    Payee findByPayeeId(int id);
}
