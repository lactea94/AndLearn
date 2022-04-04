package com.ssafy.api.controller;

import com.ssafy.api.request.LearnPostReq;
import com.ssafy.api.response.LearnDetailRes;
import com.ssafy.api.response.PicturesRes;
import com.ssafy.api.response.StatisticsRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.AwsS3Service;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Learn;
import com.ssafy.db.entity.Record;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.Word;
import com.ssafy.db.repository.LearnRepository;
import com.ssafy.db.repository.RecordRepository;
import com.ssafy.db.repository.WordRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Api(value = "Learn API", tags = {"Learn"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/learn")
public class AmazonS3Controller {

    private final AwsS3Service awsS3Service;
    private final LearnRepository learnRepository;
    private final WordRepository wordRepository;
    private final RecordRepository recordRepository;
    private final UserService userService;
    
    @ApiImplicitParam(name="key", value = "learn_id", required = true, dataType = "Long")
    @PostMapping("/{key}")
    @ApiOperation(value = "학습 내용 저장", notes = "사용자가 학습을 마치면 관련 내용을 DB에 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
           @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "learn_id에 해당하는 데이터를 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity learnSave(@PathVariable Long key,
                                    @ApiIgnore Authentication authentication,
                                      @RequestPart(value="file", required = false) @ApiParam(value="음성 파일", required = true) MultipartFile multipartFile1,
                                    @RequestPart(value="file2", required = false) @ApiParam(value="음성 파일", required = true) MultipartFile multipartFile2,
                                      @RequestPart(value="learnPostReq") @ApiParam(value="음성 파일을 제외한 나머지 학습 정보", required = true) LearnPostReq learnPostReq) {

        // key로 해당 컬럼 찾아서 rank 저장

        Optional<Learn> learnTmp = learnRepository.findById(key);
        float rank = learnPostReq.getScore();

        if (learnTmp.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        Learn learn = learnTmp.get();
        learn.setUser(user);
        learn.setScore(rank);
        learn.setCreatedDate(LocalDateTime.now());
        learnRepository.save(learn);

        // AI-words 저장
        List<String> words = learnPostReq.getWords();
        words.forEach(aiWord -> {
            Word word = new Word();
            word.setContent(aiWord);
            word.setLearn(learn);
            wordRepository.save(word);
                });
        // 음성 파일 저장
        String fileName = awsS3Service.uploadFile(multipartFile1);
        Record record1 = new Record();
        record1.setRecordUrl("https://d3qljd3xvkb8gz.cloudfront.net/"+fileName);
        record1.setLearn(learn);
        String sentence = learnPostReq.getSentences().get(0);
        record1.setSentence(sentence);
        recordRepository.save(record1);

        String fileName2 = awsS3Service.uploadFile(multipartFile2);
        Record record2 = new Record();
        record2.setRecordUrl("https://d3qljd3xvkb8gz.cloudfront.net/"+fileName2);
        record2.setLearn(learn);
        String sentence2 = learnPostReq.getSentences().get(1);
        record2.setSentence(sentence2);
        recordRepository.save(record2);


//        List<String> fileNameList = awsS3Service.uploadFiles(multipartFile);
//        for (int i=0; i< fileNameList.size(); i++) {
//            String fileName = fileNameList.get(i);
////            String url = awsS3Service.getThumbnailPath(fileName);
//            Record record = new Record();
//            record.setRecordUrl("https://d3qljd3xvkb8gz.cloudfront.net/"+fileName);
//            record.setLearn(learn);
////            Integer time = learnPostReq.getTimes().get(i);
////            record.setRecordTime(time);
//            String sentence = learnPostReq.getSentences().get(i);
//            record.setSentence(sentence);
//            recordRepository.save(record);

//        }
        return new ResponseEntity(HttpStatus.OK);

    }


//    @ApiOperation(value = "Amazon S3에 파일 업로드", notes = "Amazon S3에 파일 업로드 ")
//    @PostMapping("/file")
//    public ResponseEntity<List<String>> uploadFile(@ApiParam(value="파일들(여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile) {
////        return ApiResponse.success(awsS3Service.uploadFile(multipartFile));
//        return ResponseEntity.status(200).body(awsS3Service.uploadFiles(multipartFile));
//    }
//
//
//    @ApiOperation(value = "Amazon S3에 업로드 된 파일을 삭제", notes = "Amazon S3에 업로드된 파일 삭제")
//    @DeleteMapping("/file")
//    public ResponseEntity<Void> deleteFile(@ApiParam(value="파일 하나 삭제", required = true) @RequestParam String fileName) {
//        awsS3Service.deleteFile(fileName);
//        return new ResponseEntity(HttpStatus.OK);
//    }
//    // 주윤 유저 이미지를 위해 추가 03.31.3
//    @ApiOperation(value = "Amazon S3에 파일 업로드", notes = "Amazon S3에 파일 업로드 ")
//    @PostMapping("/image")
//    public ResponseEntity<String> uploadFile(@ApiParam(value="이미지파일 1개만", required = true) @RequestPart MultipartFile multipartFile) {
//        return ResponseEntity.status(200).body(awsS3Service.uploadFile(multipartFile));
//    }

    @ApiOperation(value = "사용자가 학습한 사진들 조회", notes = "사용자가 지금까지 학습하기 위해 업로드 한 사진들을 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/pictures")
    public ResponseEntity<List<PicturesRes>> getLearnByUser(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        List<Learn> learnList = learnRepository.findAllByUser(user);
        if (learnList == null || learnList.size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        else {
            Collections.reverse(learnList);
            List<PicturesRes> pictureList = new ArrayList<>();
            for (Learn entity : learnList) {
                pictureList.add(new PicturesRes(entity));
            }
            return ResponseEntity.status(HttpStatus.OK).body(pictureList);
        }
    }

    @ApiOperation(value = "사용자가 학습 통계를 위한 데이터 조회", notes = "사용자의 학습 통계를 위한 데이터를 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/statistics")
    public ResponseEntity<List<StatisticsRes>> getStatistics(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        List<Learn> learnList = learnRepository.findAllByUser(user);
        if (learnList == null || learnList.size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        else {
            List<StatisticsRes> pictureList = new ArrayList<>();
            for (Learn entity : learnList) {
                pictureList.add(new StatisticsRes(entity));
            }
            return ResponseEntity.status(HttpStatus.OK).body(pictureList);
        }
    }

    @ApiImplicitParam(name="key", value = "learn_id", required = true, dataType = "Long")
    @GetMapping("/picture/{key}")
    @ApiOperation(value = "Learn의 세부 내용 조회", notes = "Learn의 세부 내용을 불러온다")@ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "learn_id에 해당하는 데이터를 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<LearnDetailRes> getLearnDetail(@ApiIgnore Authentication authentication,
                                                         @PathVariable Long key) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        Optional<Learn> learnTmp = learnRepository.findById(key);
        if (learnTmp.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Learn learn = learnTmp.get();
        return ResponseEntity.status(HttpStatus.OK).body(new LearnDetailRes(learn));


    }






}
