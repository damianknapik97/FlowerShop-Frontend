package com.dknapik.flowershop;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import com.dknapik.flowershop.database.AccountRepository;
import com.dknapik.security.JwtAuthenticationFilter;
import com.dknapik.security.JwtAuthorizationFilter;
import com.dknapik.security.UserRoles;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private AccountRepository accRepository;

	
	public SecurityConfig(AccountRepository accRepository) {
		this.accRepository = accRepository;
	}

	
    @Override
    protected void configure(HttpSecurity security) throws Exception {
    	//JWT doesn't require session or csrf
    	security.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    			.and()
    			.csrf().disable()
    			.httpBasic().disable()
    			.addFilter(new JwtAuthenticationFilter(authenticationManager()))
    			.addFilter(new JwtAuthorizationFilter(authenticationManager(), this.accRepository))
    			.authorizeRequests()
    			.antMatchers(HttpMethod.POST, "/login").permitAll()
    			.antMatchers("/account/profile").authenticated()
    			.antMatchers("/account/GetAllUsers").hasRole(UserRoles.ADMIN)
    			.antMatchers("/**").permitAll();
    	
    }
    
    
    
    @Bean
    PasswordEncoder passwordEncoder() {
    	return new BCryptPasswordEncoder();
    }
}