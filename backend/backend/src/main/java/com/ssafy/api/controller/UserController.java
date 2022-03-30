package com.ssafy.api.controller;

import com.ssafy.api.request.UserEditInfoReq;
import com.ssafy.api.request.UserEditPwReq;
import com.ssafy.api.service.AwsS3Service;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Map;
import java.util.Optional;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/v1/users")
public class UserController {

	private final AwsS3Service awsS3Service;// 이거 왜이러는거
	@Autowired
	UserService userService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserRepositorySupport userRepositorySupport;

	@Autowired
	PasswordEncoder passwordEncoder;

	public UserController(AwsS3Service awsS3Service) {// 이거 붙이니깐 됨..ㄷㄷ 이게 뭐냐고 그래서
		this.awsS3Service = awsS3Service;
	}


	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		
		return ResponseEntity.status(200).body(UserRes.of(user));
	}

	@ApiOperation(value = "회원 본인 정보 수정", notes = "로그인한 회원 본인의 정보 중 닉네임과 이메일을 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "엑세스 토큰 값이 틀림"),
			@ApiResponse(code = 403, message = "엑세스 토큰이 없이 요청"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping("/edit")
	public ResponseEntity editUserInfo(@ApiIgnore Authentication authentication, @ApiParam(value="회원정보 수정 데이터", required = true) @RequestBody UserEditInfoReq userEditPutReq) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		user.setNickname(userEditPutReq.getNickname());
		userRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);

	}

	// 주윤 유저 이미지를 위해 추가 03.31.3
	@ApiOperation(value = "Amazon S3에 유저 이미지 업로드", notes = "Amazon S3에 유저 이미지 업로드 ")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "엑세스 토큰 값이 틀림"),
			@ApiResponse(code = 403, message = "엑세스 토큰이 없이 요청"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/image")
	public ResponseEntity<String> uploadFile(@ApiIgnore Authentication authentication, @ApiParam(value="이미지파일 1개만", required = true) @RequestPart MultipartFile multipartFile) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		user.setImage_url(awsS3Service.uploadFile(multipartFile));
		return ResponseEntity.status(200).body(awsS3Service.uploadFile(multipartFile));
	}
	@ApiOperation(value = "비밀번호 수정", notes = "로그인한 회원 본인의 정보 중 비밀번호를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "엑세스 토큰 값이 틀림"),
			@ApiResponse(code = 403, message = "엑세스 토큰이 없이 요청"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping("/edit-password")
	public ResponseEntity editPassword(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="새로운 비밀번호", required = true) UserEditPwReq userEditPasswordReq) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		user.setPassword(passwordEncoder.encode(userEditPasswordReq.getPassword()));
		userRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);
	}

	@ApiOperation(value = "아이디 중복체크", notes = "중복된 아이디 체크한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code=409, message = "중복되는 아이디 존재"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/duplicate-check-id")
	public ResponseEntity duplicateCheckId(@RequestBody @ApiParam(value="체크할 아이디", required = true) Map<String,Object> body) {

		String userId  = body.get("id").toString();
		Optional<User> user = userRepositorySupport.findUserByUserId(userId);

		if (user.isPresent()) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
		else {
			return new ResponseEntity(HttpStatus.OK);
		}
	}

	@ApiOperation(value = "닉네임 중복 체크", notes = "중복되는 닉네임이 있는 지 체크한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code=409, message = "중복되는 닉네임 존재"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/duplicate-check-nickname")
	public ResponseEntity duplicateCheckNickname(@RequestBody @ApiParam(value="체크할 닉네임", required = true) Map<String,Object> body) {

		String nickname  = body.get("nickname").toString();
		Optional<User> user = userRepository.findByNickname(nickname);


		if (user.isPresent()) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
		else {
			return new ResponseEntity(HttpStatus.OK);
		}
	}
}
