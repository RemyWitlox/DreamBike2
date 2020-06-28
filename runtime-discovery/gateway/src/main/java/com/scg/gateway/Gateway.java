package com.scg.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.header.XFrameOptionsServerHttpHeadersWriter.Mode;

import com.scg.bikeService.CrossOrigin;

@SpringBootApplication
@EnableEurekaClient
public class Gateway {

	public static void main(String[] args) {
		SpringApplication.run(Gateway.class, args);
	}

	@CrossOrigin(origins = "*")
	@Bean
	public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http,
			ReactiveClientRegistrationRepository clientRegistrationRepository) {
		// Authenticate through configured OpenID Provider
		http.oauth2Login();

		// Also logout at the OpenID Connect provider
//		http.logout(logout -> logout
//				.logoutSuccessHandler(new OidcClientInitiatedServerLogoutSuccessHandler(clientRegistrationRepository)));

		// Require authentication for all requests
		http.authorizeExchange().anyExchange().authenticated();

		// Allow showing /home within a frame
		http.headers().frameOptions().mode(Mode.SAMEORIGIN);

		// Disable CSRF in the gateway to prevent conflicts with proxied service CSRF
		http.csrf().disable();
		return http.build();
	}
}
