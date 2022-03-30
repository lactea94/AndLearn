package com.ssafy.api.controller;

import com.ssafy.api.request.community.CommentPostReq;
import com.ssafy.api.response.community.CommentListRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.Community;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CommentRepository;
import com.ssafy.db.repository.CommunityRepository;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
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
@RequestMapping("/v1/community/{communityId}/comment")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserService userService;

    @Autowired
    CommunityRepository communityRepository;

    @ApiOperation(value = "게시글의 댓글 리스트 조회", notes = "게시글에 달린 댓글 리스트를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping
    public ResponseEntity comments(@PathVariable Long communityId) {
        List<Comment> list = commentRepository.findByCommunityId(communityId);
        List<CommentListRes> commentList = new ArrayList<>();

        Collections.reverse(list);

        for (Comment entity : list) {
            commentList.add(new CommentListRes(entity));
        }

        return new ResponseEntity<>(commentList, HttpStatus.OK);
    }

    @ApiOperation(value = "댓글 작성", notes = "user가 댓글을 작성한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping
    public ResponseEntity commentPost(@ApiIgnore Authentication authentication, @PathVariable Long communityId, @RequestBody @ApiParam(value = "댓글 정보", required = true) CommentPostReq commentPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        Optional<Community> option = communityRepository.findById(communityId);
        if (option.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        Community community = option.get();


        commentRepository.save(Comment.builder()
                .content(commentPostReq.getContent())
                .createdDate(LocalDateTime.now())
                .user(user)
                .community(community)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "댓글 삭제", notes = "user가 댓글을 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "commentId", value = "댓글 seq", required = true, dataType = "Long")
    @DeleteMapping("/{commentId}")
    public ResponseEntity commentDelete(@ApiIgnore Authentication authentication, @PathVariable Long communityId, @PathVariable Long commentId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        Optional<Community> optionalCommunity = communityRepository.findById(communityId);
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty() || optionalCommunity.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        Comment comment = optionalComment.get();
        if (!comment.getUser().equals(user)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        commentRepository.deleteById(commentId);
        return new ResponseEntity(HttpStatus.OK);


    }


}
