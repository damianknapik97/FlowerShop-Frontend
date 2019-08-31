package com.dknapik.flowershop.database;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dknapik.flowershop.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

}
