package com.ssafy.api.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.ssafy.api.request.GoogleLoginDto;
import com.ssafy.api.request.GoogleLoginRequest;
import com.ssafy.api.response.GoogleLoginResponse;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.config.ConfigUtils;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.Optional;


@Controller
@RequestMapping(value = "/google")
public class GoogleController {

    private final ConfigUtils configUtils;
    private final UserRepository userRepository;

    GoogleController(ConfigUtils configUtils, UserRepository userRepository) {
        this.configUtils = configUtils;
        this.userRepository = userRepository;
    }

    @GetMapping(value = "/login")
    public ResponseEntity<Object> moveGoogleInitUrl() {
        String authUrl = configUtils.googleInitUrl();
        URI redirectUri = null;
        try {
            redirectUri = new URI(authUrl);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(redirectUri);
            return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping(value = "/login/redirect")
    public ResponseEntity<String> redirectGoogleLogin(
            @RequestParam(value = "code") String authCode
    ) {
        // HTTP 통신을 위해 RestTemplate 활용
        RestTemplate restTemplate = new RestTemplate();
        GoogleLoginRequest requestParams = GoogleLoginRequest.builder()
                .clientId(configUtils.getGoogleClientId())
                .clientSecret(configUtils.getGoogleSecret())
                .code(authCode)
                .redirectUri(configUtils.getGoogleRedirectUri())
                .grantType("authorization_code")
                .build();

        try {
            // Http Header 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<GoogleLoginRequest> httpRequestEntity = new HttpEntity<>(requestParams, headers);
            ResponseEntity<String> apiResponseJson = restTemplate.postForEntity(configUtils.getGoogleAuthUrl() + "/token", httpRequestEntity, String.class);

            // ObjectMapper를 통해 String to Object로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
            objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL); // NULL이 아닌 값만 응답받기(NULL인 경우는 생략)
            GoogleLoginResponse googleLoginResponse = objectMapper.readValue(apiResponseJson.getBody(), new TypeReference<GoogleLoginResponse>() {});

            // 사용자의 정보는 JWT Token으로 저장되어 있고, Id_Token에 값을 저장한다.
            String jwtToken = googleLoginResponse.getIdToken();

            // JWT Token을 전달해 JWT 저장된 사용자 정보 확인
            String requestUrl = UriComponentsBuilder.fromHttpUrl(configUtils.getGoogleAuthUrl() + "/tokeninfo").queryParam("id_token", jwtToken).toUriString();

            String resultJson = restTemplate.getForObject(requestUrl, String.class);
            System.out.println(resultJson);

            if(resultJson != null) {
                GoogleLoginDto userInfoDto = objectMapper.readValue(resultJson, new TypeReference<GoogleLoginDto>() {});
                Optional<User> tmpUser = userRepository.findByUserId(userInfoDto.getEmail());
                if (tmpUser.isEmpty()) { // 존재하지 않은 email이면 회원가입을 시켜줘야 함
                    System.out.println(ResponseEntity.ok().body(userInfoDto));
//                    return ResponseEntity.ok().body("ok");
                    URI redirectUri = new URI("https://j6c201.p.ssafy.io/signup");
                    HttpHeaders httpHeaders = new HttpHeaders();
                    httpHeaders.setLocation(redirectUri);
                    return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);

                }
                else { // 존재하는 email이면
                    User user = tmpUser.get();
                    String userId = user.getUserId();
                    return ResponseEntity.ok().body(JwtTokenUtil.getToken(userId));
                }



            }
            else {
                throw new Exception("Google OAuth failed!");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.badRequest().body(null);
    }
}