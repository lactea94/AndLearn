package com.ssafy.api.controller;

import com.ssafy.api.request.community.CommunityPostReq;
import com.ssafy.api.response.community.CommunityListRes;
import com.ssafy.api.response.community.CommunityRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Community;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CommunityRepository;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.checkerframework.checker.guieffect.qual.PolyUIType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/v1/community")
@Api(value = "Community API", tags = {"Community"})
public class CommunityController {

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    UserService userService;

    @ApiOperation(value = "게시판 리스트 조회", notes = "게시판 리스트를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message="조회 성공"),
            @ApiResponse(code = 500, message="서버 오류")
    })
    @GetMapping
    public ResponseEntity list() {
        List<Community> list = communityRepository.findAll();
        List<CommunityListRes> communityList = new ArrayList<>();

        Collections.reverse(list);

        for (Community entity : list) {
            communityList.add(new CommunityListRes(entity));
        }

        return new ResponseEntity<>(communityList, HttpStatus.OK);
    }

    @ApiOperation(value = "게시판 특정 리스트 조회", notes = "게시글 중 본인이 작성한 게시판 리스트를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message="조회 성공"),
            @ApiResponse(code = 500, message="서버 오류")
    })
    @GetMapping("/me")
    public ResponseEntity communityListByUser(@ApiIgnore Authentication authentication) {
        List<Community> list = communityRepository.findAll();
        List<CommunityListRes> communityList = new ArrayList<>();
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();

        User user = userService.getUserByUserId(userId);

        Collections.reverse(list);

        for (Community entity : list) {
            if (entity.getUser().equals(user)) {
                communityList.add(new CommunityListRes(entity));
            }
        }

        return new ResponseEntity<>(communityList, HttpStatus.OK);
    }



    @ApiOperation(value = "특정 게시글 조회", notes = "특정 게시글을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name="communityId", value = "게시글 조회", required = true, dataType = "Long")
    @GetMapping("/{communityId}")
    public ResponseEntity community(@PathVariable Long communityId) {
        Optional<Community> option = communityRepository.findById(communityId);
        if (option.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        Community community = option.get();
        CommunityRes communityRes = new CommunityRes(community);
        return new ResponseEntity<>(communityRes, HttpStatus.OK);
    }



    @ApiOperation(value = "특정 게시글 삭제", notes = "user 중 자신의 게시글을 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name="communityId", value = "게시글 seq", required = true, dataType = "Long")
    @DeleteMapping("/{communityId}")
    public ResponseEntity delete(@ApiIgnore Authentication authentication, @PathVariable Long communityId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Optional<Community> option = communityRepository.findById(communityId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        Community community = option.get();
        if (!community.getUser().equals(user)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        communityRepository.deleteById(communityId);
        return new ResponseEntity(HttpStatus.OK);

    }

    @ApiOperation(value = "게시글 작성", notes = "user가 게시글을 작성한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping
    public ResponseEntity post(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="게시글 정보", required = true) CommunityPostReq communityPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        communityRepository.save(Community.builder()
                .title(communityPostReq.getTitle())
                .content(communityPostReq.getContent())
                .createdDate(LocalDateTime.now())
                .updatedDate(LocalDateTime.now())
                .isNotice(communityPostReq.getIsNotice())
                .user(user)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 수정", notes = "작성자가 게시글을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name="communityId", value = "게시글 seq", required = true)
    @PutMapping("/{communityId}")
    public ResponseEntity update(@ApiIgnore Authentication authentication, @PathVariable Long communityId, @RequestBody @ApiParam(value = "게시글 수정 정보", required = true) CommunityPostReq communityPostReq) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        Optional<Community> option = communityRepository.findById(communityId);
        if (option.isEmpty()) {
            return null;
        }
        Community community = option.get();
        if (!community.getUser().equals(user)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        community.setTitle(communityPostReq.getTitle());
        community.setContent(communityPostReq.getContent());
        community.setUpdatedDate(LocalDateTime.now());

        communityRepository.save(community);
        return new ResponseEntity(HttpStatus.OK);
    }

    //------------------공지사항---------------------
    @ApiOperation(value = "공지사항 리스트 조회", notes = "공지사항 리스트를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/notice")
    public ResponseEntity noticeList() {
        List<Community> list = communityRepository.findAll();
        List<CommunityListRes> communityList = new ArrayList<>();

        Collections.reverse(list);

        for (Community entity : list) {
            if (entity.getIsNotice()) {
                communityList.add(new CommunityListRes(entity));
            }
        }
        return new ResponseEntity<>(communityList, HttpStatus.OK);
    }

    @ApiOperation(value = "특정 공지사항 조회", notes = "특정 공지사항을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "communityId", value = "공지사항 seq", required = true)
    @GetMapping("/notice/{communityId}")
    public ResponseEntity notice(@ApiIgnore Authentication authentication, @PathVariable Long communityId) {
        Optional<Community> option = communityRepository.findById(communityId);
        if (option.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        Community community = option.get();
        CommunityRes communityRes = new CommunityRes(community);
        return new ResponseEntity<>(communityRes, HttpStatus.OK);
    }

    @ApiOperation(value = "공지사항 작성", notes = "user 중 admin 권한을 가진 사람이 공지사항을 작성한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping("/notice")
    public ResponseEntity noticePost(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "공지사항 정보", required = true) CommunityPostReq communityPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        if (user.getAdmin().equals(Boolean.FALSE)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        communityRepository.save(Community.builder()
                .title(communityPostReq.getTitle())
                .content(communityPostReq.getContent())
                .createdDate(LocalDateTime.now())
                .updatedDate(LocalDateTime.now())
                .isNotice(Boolean.TRUE)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "공지사항 수정", notes = "user 중 admin 권한을 가진 사람이 공지사항을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "communityId", value = "공지사항 seq", required = true)
    @PutMapping("/notice/{communityId}")
    public ResponseEntity noticeUpdate(@ApiIgnore Authentication authentication, @PathVariable Long communityId, @RequestBody @ApiParam(value = "공지사항 수정 정보", required = true) CommunityPostReq communityPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        if (user.getAdmin().equals(Boolean.FALSE)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        Optional<Community> option = communityRepository.findById(communityId);
        if (option.isEmpty()) {
            return null;
        }
        Community community = option.get();
        community.setTitle(communityPostReq.getTitle());
        community.setContent(communityPostReq.getContent());
        community.setUpdatedDate(LocalDateTime.now());
        community.setIsNotice(communityPostReq.getIsNotice());
        communityRepository.save(community);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "공지사항 삭제", notes = "user 중 admin 권한을 가지 사람이 공지사항을 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "communityId", value = "공지사항 seq", required = true)
    @DeleteMapping("/notice/{communityId}")
    public ResponseEntity noticeDelete(@ApiIgnore Authentication authentication, @PathVariable Long communityId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        if (user.getAdmin().equals(Boolean.FALSE)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        communityRepository.deleteById(communityId);
        return new ResponseEntity(HttpStatus.OK);
    }


}
