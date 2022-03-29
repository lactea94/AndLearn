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
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/s3")
public class AmazonS3Controller {

    private final AwsS3Service awsS3Service;
    private final LearnRepository learnRepository;
    private final WordRepository wordRepository;
    private final RecordRepository recordRepository;
    private final UserService userService;

    @PostMapping("/learn/{key}")
    public ResponseEntity learnSave(@PathVariable Long key,
                                    Authentication authentication,
                                      @RequestPart(value="file", required = false) List<MultipartFile> multipartFile,
                                      @RequestPart(value="learnPostReq") LearnPostReq learnPostReq) {

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
        List<String> fileNameList = awsS3Service.uploadFiles(multipartFile);
        for (int i=0; i< fileNameList.size(); i++) {
            String fileName = fileNameList.get(i);
            String url = awsS3Service.getThumbnailPath(fileName);
            Record record = new Record();
            record.setRecordUrl(url);
            record.setLearn(learn);
            Integer time = learnPostReq.getTimes().get(i);
            record.setRecordTime(time);
            String sentence = learnPostReq.getSentences().get(i);
            record.setSentence(sentence);
            recordRepository.save(record);

        }
//        fileNameList.forEach(fileName -> {
//            String url = awsS3Service.getThumbnailPath(fileName);
//            Record record = new Record();
//            record.setRecordUrl(url);
//            record.setLearn(learn);
//            recordRepository.save(record);
//        });

        return new ResponseEntity(HttpStatus.OK);

    }


    @ApiOperation(value = "Amazon S3에 파일 업로드", notes = "Amazon S3에 파일 업로드 ")
    @PostMapping("/file")
    public ResponseEntity<List<String>> uploadFile(@ApiParam(value="파일들(여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile) {
//        return ApiResponse.success(awsS3Service.uploadFile(multipartFile));
        return ResponseEntity.status(200).body(awsS3Service.uploadFiles(multipartFile));
    }


    @ApiOperation(value = "Amazon S3에 업로드 된 파일을 삭제", notes = "Amazon S3에 업로드된 파일 삭제")
    @DeleteMapping("/file")
    public ResponseEntity<Void> deleteFile(@ApiParam(value="파일 하나 삭제", required = true) @RequestParam String fileName) {
        awsS3Service.deleteFile(fileName);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/pictures")
    public ResponseEntity<List<PicturesRes>> getLearnByUser(Authentication authentication) {
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

    @GetMapping("/statistics")
    public ResponseEntity<List<StatisticsRes>> getStatistics(Authentication authentication) {
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

    @GetMapping("/picture/{key}")
    public ResponseEntity<LearnDetailRes> getLearnDetail(@PathVariable Long key) {
        Optional<Learn> learnTmp = learnRepository.findById(key);
        if (learnTmp.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Learn learn = learnTmp.get();
        return ResponseEntity.status(HttpStatus.OK).body(new LearnDetailRes(learn));


    }






}