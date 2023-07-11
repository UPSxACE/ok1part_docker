package com.example.ok1part_spring.configurations;

import jakarta.servlet.FilterRegistration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class IpFilterConfig {
    @Bean
    public FilterRegistrationBean<IpFilter> ipFilter() {
        FilterRegistrationBean<IpFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new IpFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }
}
