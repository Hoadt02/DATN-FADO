package com.fado.watch.config;

import com.fado.watch.security.jwt.JwtEntryPoint;
import com.fado.watch.security.jwt.JwtTokenFilter;
import com.fado.watch.security.userprincal.customer.CustomerUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@Order(2)
public class CustomerSecurityConfig extends WebSecurityConfigurerAdapter {
    private static final String SU = "SUPER_ADMIN";
    private static final String AD = "ADMIN";
    private static final String CU = "CUSTOMER";
    @Autowired
    CustomerUserDetailService customerUserDetailService;
    @Autowired
    private JwtEntryPoint jwtEntryPoint;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(customerUserDetailService).passwordEncoder(passwordEncoder);
    }

    @Bean(name = "authenticationManager2")
    @Override
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable().cors().disable();
        httpSecurity.authorizeRequests()
                .anyRequest().permitAll()
//                .antMatchers("/api/auth/**").permitAll()
//                .antMatchers(HttpMethod.GET,"/api/v1/productDetail").permitAll()
//                .antMatchers(HttpMethod.GET,"/api/v1/category").permitAll()
//                .antMatchers(HttpMethod.GET,"/api/v1/brand").permitAll()
//                .antMatchers(HttpMethod.GET,"/api/v1/material").permitAll()
//                .antMatchers(HttpMethod.GET,"/api/v1/origin").permitAll()
//                .antMatchers(HttpMethod.GET,"/api/v1/staff/**").hasAnyRole(SU, AD)
//                .antMatchers(HttpMethod.PUT,"/api/v1/staff/**").hasAnyRole(SU, AD)
//                .antMatchers(HttpMethod.GET,"/api/v1/customer").hasAnyRole(SU, AD)
//                .antMatchers(HttpMethod.GET,"/api/v1/customer/**").hasAnyRole(SU, AD,CU)
//                .antMatchers(HttpMethod.POST,"/api/v1/customer").hasAnyRole(SU, AD)
//                .antMatchers(HttpMethod.PUT,"/api/v1/customer/**").hasAnyRole(SU, AD, CU)
//                .anyRequest().hasRole(SU)
                .and().exceptionHandling()
                .authenticationEntryPoint(jwtEntryPoint)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        httpSecurity.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
