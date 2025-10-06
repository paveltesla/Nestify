package com.example.nestify.repository;

import com.example.nestify.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    /**
     * Находит роль по имени роли.
     *
     * @param roleName имя роли
     * @return Optional с найденной ролью или пустой Optional, если роль не найдена
     */
    Optional<Role> findByRoleName(String roleName);
}
