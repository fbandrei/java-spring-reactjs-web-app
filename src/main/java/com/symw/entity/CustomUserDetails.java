package com.symw.entity;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails extends User implements UserDetails{

	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private Collection<? extends GrantedAuthority> authorities;

	public CustomUserDetails(final Optional<User> user) {
		super(user.get());
	}

	public CustomUserDetails(
			Long id,
			String firstName,
			String lastName,
			String email,
			String password,
			Collection<? extends GrantedAuthority> authorities
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
	}

	public static CustomUserDetails create(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
				new SimpleGrantedAuthority(role.getName())
		).collect(Collectors.toList());

		return new CustomUserDetails(
				user.getId(),
				user.getFirstName(),
				user.getLastName(),
				user.getEmail(),
				user.getPassword(),
				authorities
		);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getUsername() {
		return super.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public String getFirstName() {
		return firstName;
	}

	@Override
	public String getLastName() {
		return lastName;
	}

	@Override
	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}
}
